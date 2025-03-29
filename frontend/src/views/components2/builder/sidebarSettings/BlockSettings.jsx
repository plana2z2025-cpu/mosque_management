import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const BlockSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Block Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="block-name">Block Name</Label>
          <Input id="block-name" placeholder="Content Block" />
        </div>

        <div className="space-y-2">
          <Label>Width</Label>
          <Select defaultValue="full">
            <SelectTrigger>
              <SelectValue placeholder="Select width" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Width</SelectItem>
              <SelectItem value="fixed">Fixed Width</SelectItem>
              <SelectItem value="auto">Auto Width</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Background</Label>
          <div className="grid grid-cols-6 gap-2">
            <div className="w-8 h-8 bg-white border rounded-md cursor-pointer" />
            <div className="w-8 h-8 bg-gray-100 rounded-md cursor-pointer" />
            <div className="w-8 h-8 bg-blue-100 rounded-md cursor-pointer" />
            <div className="w-8 h-8 bg-green-100 rounded-md cursor-pointer" />
            <div className="w-8 h-8 bg-yellow-100 rounded-md cursor-pointer" />
            <div className="w-8 h-8 rounded-md border cursor-pointer flex items-center justify-center">
              +
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Padding</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Top</Label>
              <Input type="number" defaultValue="16" className="h-8" />
            </div>
            <div>
              <Label className="text-xs">Right</Label>
              <Input type="number" defaultValue="16" className="h-8" />
            </div>
            <div>
              <Label className="text-xs">Bottom</Label>
              <Input type="number" defaultValue="16" className="h-8" />
            </div>
            <div>
              <Label className="text-xs">Left</Label>
              <Input type="number" defaultValue="16" className="h-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockSettings;
