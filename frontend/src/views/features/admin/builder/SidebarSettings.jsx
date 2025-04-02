import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Settings, Layers, Box, Type } from 'lucide-react';
import SectionSettings from '@/views/components2/builder/sidebarSettings/SectionSettings';
import BlockSettings from '@/views/components2/builder/sidebarSettings/BlockSettings';
import ElementSettings from '@/views/components2/builder/sidebarSettings/ElementSettings';
import NoSelectionPlaceholder from '@/views/components2/builder/sidebarSettings/InActiveSettings';
import { useDispatch, useSelector } from 'react-redux';

const SidebarSettings = () => {
  const dispatch = useDispatch();

  const { activeSection } = useSelector((state) => state.builderToolkitState);
  const [activeTab, setActiveTab] = useState('element');

  return (
    <div className="h-screen bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Settings className="h-5 w-5 mr-2" />
        Settings
      </h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="element" className="flex items-center justify-center">
            <Type className="h-4 w-4 mr-2" />
            Element
          </TabsTrigger>
          <TabsTrigger value="block" className="flex items-center justify-center">
            <Box className="h-4 w-4 mr-2" />
            Block
          </TabsTrigger>
          <TabsTrigger value="section" className="flex items-center justify-center">
            <Layers className="h-4 w-4 mr-2" />
            Section
          </TabsTrigger>
        </TabsList>

        {/* Element Settings */}
        <TabsContent value="element">
          {activeSection ? <ElementSettings /> : <NoSelectionPlaceholder />}
        </TabsContent>

        {/* Block Settings */}
        <TabsContent value="block">
          {activeSection ? <BlockSettings /> : <NoSelectionPlaceholder />}
        </TabsContent>

        {/* Section Settings */}
        <TabsContent value="section">
          {activeSection ? <SectionSettings /> : <NoSelectionPlaceholder />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SidebarSettings;
