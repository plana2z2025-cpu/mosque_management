import React, { useState } from 'react';
import _ from '@/helpers/loadash';
import { useSelector, useDispatch } from 'react-redux';
import { builderActions } from '@/redux/combineActions';
import ButtonComponent from '../ElementComponents/ButtonComponent';
import TextComponent from '../ElementComponents/TextComponent';
import LogoComponent from '../ElementComponents/LogoComponent';
import DividerComponent from '../ElementComponents/DividerComponent';

const ColumnComponent = ({ layout, sectionIndex }) => {
  const dispatch = useDispatch();
  const { setDragLayoutAction, setTemplateDataAction } = builderActions;
  const { screenSize, dragLayout, templateSections } = useSelector(
    (state) => state.builderToolkitState
  );

  const [info, setInfo] = useState({
    dragOver: null,
    dragOverClass: null,
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
      dragOverClass: null,
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
      dragOverClass: null,
    }));
  };

  const elementTypesConstants = {
    button: ButtonComponent,
    text: TextComponent,
    logo: LogoComponent,
    divider: DividerComponent,
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
              key={index}
              className={`p-2 flex items-center justify-center 
                ${_.size(_.keys(singleBlock?.subBlock)) === 0 && 'bg-gray-100 border border-dashed'}
                ${info?.dragOverClass && info?.dragOver?.index == index && info?.dragOverClass}`}
              onDragOver={(e) => onDragOverHandler(e, index)}
              onDragLeave={onDragLeaveHandler}
              onDrop={onDropHandler}
            >
              {_.size(_.keys(singleBlock?.subBlock)) > 0 ? (
                singleBlock?.subBlock.map((singleSubBlock) => {
                  const ComponentType = elementTypesConstants[singleSubBlock.type.toLowerCase()];
                  return ComponentType ? <ComponentType {...singleSubBlock} /> : null;
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
