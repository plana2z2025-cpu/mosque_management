import React, { useState } from 'react';
import _ from '@/helpers/loadash';
import { useSelector, useDispatch } from 'react-redux';
import { builderActions } from '@/redux/combineActions';
import ButtonComponent from '../ElementComponents/ButtonComponent';
import TextComponent from '../ElementComponents/TextComponent';
import LogoComponent from '../ElementComponents/LogoComponent';
import DividerComponent from '../ElementComponents/DividerComponent';
import ImageComponent from '../ElementComponents/ImageComponent';

const ColumnComponent = ({ layout, sectionIndex }) => {
  const dispatch = useDispatch();
  const { setDragLayoutAction, setTemplateDataAction, setActiveSectionAction } = builderActions;
  const { screenSize, dragLayout, templateSections, activeSection } = useSelector(
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
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${layout.columns},1fr)`,
        }}
      >
        {layout?.block?.map((singleBlock, index) => {
          return (
            <div
              key={singleBlock?.uuid || index}
              className={`p-2 flex items-center justify-center 
                ${_.size(_.keys(singleBlock?.subBlock)) === 0 && 'bg-gray-100 border border-dashed'}
                ${info?.dragOverClass && info?.dragOver?.index == index && info?.dragOverClass}
                `}
              onDragOver={(e) => onDragOverHandler(e, index)}
              onDragLeave={onDragLeaveHandler}
              onDrop={onDropHandler}
              style={{ ...layout.styles }}
            >
              {_.size(_.keys(singleBlock?.subBlock)) > 0 ? (
                singleBlock?.subBlock.map((singleSubBlock, subBlockIndex) => {
                  const ComponentType = elementTypesConstants[singleSubBlock.type.toLowerCase()];
                  return ComponentType ? (
                    <div
                      className={`${activeSection?.section_uuid === layout?.uuid && activeSection?.block_uuid === singleBlock?.uuid && 'border border-blue-500'}`}
                      onClick={() => setActiveElementFunction(layout, singleBlock)}
                    >
                      <ComponentType {...singleSubBlock} />
                    </div>
                  ) : null;
                })
              ) : (
                <h2 className="p-4 text-center text-sm bg-gray-100 border border-dashed">
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
