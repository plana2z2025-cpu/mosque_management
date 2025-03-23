import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { builderActions } from '@/redux/combineActions';
import _ from '@/helpers/loadash';
import ColumnComponent from './library/LayoutElements/ColumnComponent';

const Canvas = () => {
  const dispatch = useDispatch();
  const { setDragLayoutAction, setTemplateDataAction } = builderActions;
  const { screenSize, dragLayout, templateSections } = useSelector(
    (state) => state.builderToolkitState
  );
  const [info, setInfo] = useState({
    dragOver: false,
    dragOverClass: 'bg-white',
  });

  const layoutDragOverFunction = useCallback(
    (e) => {
      e.preventDefault();

      if (!info?.dragOver) {
        let dragOverClass = dragLayout.type === 'column' ? 'bg-green-200' : 'bg-red-200';
        setInfo((prev) => ({
          ...prev,
          dragOver: true,
          dragOverClass,
        }));
      }
    },
    [info?.dragOver, info?.dragOverClass, templateSections, dragLayout]
  );

  const layoutDropHandler = (e) => {
    let infoState = { dragOver: false, dragOverClass: 'bg-white' };
    if (dragLayout?.type === 'column') {
      let updatedSections = _.deepClone(templateSections || []);
      updatedSections.push(dragLayout?.json);
      dispatch(setTemplateDataAction(updatedSections));
    }

    dispatch(setDragLayoutAction(null));
    setInfo((prev) => ({
      ...prev,
      ...infoState,
    }));
  };

  const layoutDragLeaveFunction = useCallback(() => {
    setInfo((prev) => ({ ...prev, dragOver: false, dragOverClass: 'bg-white' }));
  }, []);

  const componentRenderObject = {
    column: ColumnComponent,
  };

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={`p-6 w-full ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-lg'} ${info?.dragOverClass}`}
        onDragOver={layoutDragOverFunction}
        onDrop={layoutDropHandler}
        onDragLeave={layoutDragLeaveFunction}
      >
        {_.size(templateSections) > 0 ? (
          templateSections?.map((block, index) => {
            const Comp = componentRenderObject[block.type];
            return <Comp key={block?.uuid || index} layout={block} sectionIndex={index} />;
          })
        ) : (
          <h2 className="p-4 text-center bg-gray-100 border border-dashed">Add Layout Here</h2>
        )}
      </div>
    </div>
  );
};

export default Canvas;
