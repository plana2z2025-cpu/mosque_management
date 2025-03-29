import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const ElementSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Element Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="element-name">Element Name</Label>
          <Input id="element-name" placeholder="Text Element" />
        </div>

        <div className="space-y-2">
          <Label>Typography</Label>
          <Select defaultValue="paragraph">
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="heading1">Heading 1</SelectItem>
              <SelectItem value="heading2">Heading 2</SelectItem>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="caption">Caption</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Font Size</Label>
          <div className="flex items-center space-x-2">
            <Slider defaultValue={[16]} max={72} step={1} />
            <span className="w-12 text-center">16px</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <div className="grid grid-cols-6 gap-2">
            <div className="w-8 h-8 bg-black rounded-md cursor-pointer" />
            <div className="w-8 h-8 bg-gray-700 rounded-md cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-md cursor-pointer" />
            <div className="w-8 h-8 bg-green-600 rounded-md cursor-pointer" />
            <div className="w-8 h-8 bg-red-600 rounded-md cursor-pointer" />
            <div className="w-8 h-8 rounded-md border cursor-pointer flex items-center justify-center">
              +
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="element-visible">Visible</Label>
          <Switch id="element-visible" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};

export default ElementSettings;
