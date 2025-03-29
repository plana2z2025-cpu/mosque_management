import React, { useMemo, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Grid } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ColorPicker from '../../color-picker/ColorPicker';
import { useSelector, useDispatch } from 'react-redux';
import { builderActions } from '@/redux/combineActions';
import _ from '@/helpers/loadash';

const SectionSettings = () => {
  const { setTemplateDataAction, setActiveSectionAction } = builderActions;
  const dispatch = useDispatch();
  const { activeSection, templateSections } = useSelector((state) => state.builderToolkitState);

  const sectionStyles = useMemo(() => {
    let sectionId = activeSection?.section_uuid;
    let layout = templateSections?.find((item) => item?.uuid === sectionId);
    return { ...layout?.styles };
  }, [activeSection?.section_uuid, templateSections]);

  const changeColorFunction = (color, property) => {
    console.log('testing', color, property);
    let sectionId = activeSection?.section_uuid;
    let updatedSections = _.deepClone(templateSections);

    if (property === 'background') {
      updatedSections.forEach((section) => {
        if (section?.uuid === sectionId) {
          section.styles.background = color;
        }
      });
    }

    dispatch(setTemplateDataAction(updatedSections));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* <div className="space-y-2">
          <Label htmlFor="section-name">Section Name</Label>
          <Input id="section-name" placeholder="Hero Section" />
        </div> */}

        {/* <div className="space-y-2">
          <Label>Layout</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="border rounded-md p-2 cursor-pointer hover:border-blue-500">
              <Grid className="h-16 w-full mb-2 text-gray-400" />
              <p className="text-xs text-center">Single Column</p>
            </div>
            <div className="border rounded-md p-2 cursor-pointer hover:border-blue-500">
              <div className="flex h-16 mb-2">
                <Grid className="w-1/2 text-gray-400" />
                <Grid className="w-1/2 text-gray-400" />
              </div>
              <p className="text-xs text-center">Two Columns</p>
            </div>
          </div>
        </div> */}

        {/* <div className="space-y-2">
          <Label>Container Type</Label>
          <Select defaultValue="container">
            <SelectTrigger>
              <SelectValue placeholder="Select container type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="container">Container</SelectItem>
              <SelectItem value="fluid">Fluid</SelectItem>
              <SelectItem value="custom">Custom Width</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        {/* <div className="space-y-2">
          <Label htmlFor="section-margin">Vertical Spacing</Label>
          <Slider defaultValue={[32]} max={128} step={8} />
        </div> */}

        {/* <div className="flex items-center justify-between">
          <Label htmlFor="section-visible">Visible</Label>
          <Switch id="section-visible" defaultChecked />
        </div> */}

        {/* <Button className="w-full">Apply Settings</Button> */}

        <div>
          <ColorPicker
            value={sectionStyles?.background}
            onChange={(e) => changeColorFunction(e, 'background')}
            label="Background Color"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(SectionSettings);
