import React, { useState } from 'react';
import _ from '@/helpers/loadash';
import { useSelector, useDispatch } from 'react-redux';
import { builderActions } from '@/redux/combineActions';
import ButtonComponent from '../ElementComponents/ButtonComponent';
import TextComponent from '../ElementComponents/TextComponent';
import LogoComponent from '../ElementComponents/LogoComponent';
import DividerComponent from '../ElementComponents/DividerComponent';
import ImageComponent from '../ElementComponents/ImageComponent';
import { cn } from '@/lib/utils';

const ColumnComponent = ({ layout, sectionIndex }) => {
  const dispatch = useDispatch();
  const { setDragLayoutAction, setTemplateDataAction, setActiveSectionAction } = builderActions;
  const { dragLayout, templateSections, activeSection } = useSelector(
    (state) => state.builderToolkitState
  );

  const elementTypesConstants = {
    button: ButtonComponent,
    text: TextComponent,
    logo: LogoComponent,
    divider: DividerComponent,
    image: ImageComponent,
  };

  const [info, setInfo] = useState({
    dragOver: null,
    dragOverClass: '',
  });

  const onDragOverHandler = (event, index) => {
    event.preventDefault();
    let dragOver = { index, columns: layout.uuid };

    setInfo((prev) => ({
      ...prev,
      dragOver,
      dragOverClass: 'bg-purple-200',
    }));
  };

  const onDragLeaveHandler = () => {
    setInfo((prev) => ({
      ...prev,
      dragOver: null,
      dragOverClass: '',
    }));
  };

  const onDropHandler = () => {
    if (dragLayout) {
      let updatedSections = _.deepClone(templateSections || []);
      let index = info?.dragOver?.index;
      let json = _.deepClone(dragLayout);
      delete json.icon;
      updatedSections[sectionIndex].block[index].subBlock.push(json);
      dispatch(setTemplateDataAction(updatedSections));
    }
    dispatch(setDragLayoutAction(null));
    setInfo((prev) => ({
      ...prev,
      dragOver: null,
      dragOverClass: '',
    }));
  };

  const setActiveElementFunction = (layout, block) => {
    let data = {
      section_uuid: layout?.uuid,
      block_uuid: block?.uuid,
    };

    dispatch(setActiveSectionAction(data));
  };

  return (
    <div>
      <div
        className={cn(layout?.styleClassName)}
        style={{
          ...layout?.styles,
        }}
      >
        {layout?.block?.map((singleBlock, index) => {
          return (
            <div
              key={singleBlock?.uuid || index}
              className={cn(
                singleBlock?.blockStyleClassName,
                _.size(_.keys(singleBlock?.subBlock)) === 0 &&
                  'bg-gray-100 opacity-90 border border-dashed',
                info?.dragOverClass && info?.dragOver?.index == index && info?.dragOverClass,
                activeSection?.section_uuid === layout?.uuid &&
                  activeSection?.block_uuid === singleBlock?.uuid &&
                  'border border-blue-500'
              )}
              onDragOver={(e) => onDragOverHandler(e, index)}
              onDragLeave={onDragLeaveHandler}
              onDrop={onDropHandler}
              style={{ ...singleBlock?.blockStyles }}
            >
              {_.size(_.keys(singleBlock?.subBlock)) > 0 ? (
                singleBlock?.subBlock.map((singleSubBlock, subBlockIndex) => {
                  const ComponentType = elementTypesConstants[singleSubBlock.type.toLowerCase()];
                  return ComponentType ? (
                    <div
                      className={cn('')}
                      onClick={() => setActiveElementFunction(layout, singleBlock)}
                    >
                      <ComponentType {...singleSubBlock} />
                    </div>
                  ) : null;
                })
              ) : (
                <h2 className={cn('p-4 text-center text-sm bg-gray-100 border border-dashed')}>
                  Add Element
                </h2>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColumnComponent;
