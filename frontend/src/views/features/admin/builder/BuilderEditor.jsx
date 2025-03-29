import BuilderHeader from '@/views/components2/builder/header/Header';
import React from 'react';
import ElementSidebar from './ElementSidebar';
import SidebarSettings from './SidebarSettings';
import Canvas from './Canvas';

const BuilderEditor = () => {
  return (
    <div>
      <BuilderHeader />

      <div className="grid grid-cols-5">
        <ElementSidebar />

        <div className=" col-span-3 bg-gray-100">
          <Canvas />
        </div>

        <SidebarSettings />
      </div>
    </div>
  );
};

export default BuilderEditor;
