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
import { getNumberFromPx } from '@/helpers/get-initials';

const SectionSettings = () => {
  const { setTemplateDataAction } = builderActions;
  const dispatch = useDispatch();
  const { activeSection, templateSections } = useSelector((state) => state.builderToolkitState);

  const sectionLayout = useMemo(() => {
    let sectionId = activeSection?.section_uuid;
    let layout = templateSections?.find((item) => item?.uuid === sectionId);
    return layout;
  }, [activeSection?.section_uuid, templateSections]);

  const changeColorFunction = (color, property) => {
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

  const changeContainerTypeSelection = (e) => {
    let updatedTemplate = _.deepClone(templateSections);
    let currentLayout = updatedTemplate?.find((item) => item.uuid === sectionLayout?.uuid);
    currentLayout.properties.containerType = e;

    if (e === 'grid') {
      currentLayout.styleClassName = currentLayout.styleClassName.replace(
        'flex',
        `grid gap-0 grid-cols-${currentLayout?.properties?.columns}`
      );
      currentLayout?.block?.forEach((item) => {
        delete item.blockStyles.width;
      });
    } else if (e === 'flex') {
      currentLayout.styleClassName = currentLayout.styleClassName.replace(
        `grid gap-0 grid-cols-${currentLayout?.properties?.columns}`,
        'flex'
      );
      let equalWidths = parseFloat((100 / currentLayout?.properties?.columns).toFixed(2));
      currentLayout?.block?.forEach((item) => {
        item.blockStyles.width = equalWidths + '%';
      });
    }
    updatedTemplate.forEach((item) => {
      if (item?.uuid === sectionLayout?.uuid) {
        item = currentLayout;
      }
    });

    dispatch(setTemplateDataAction(updatedTemplate));
  };

  const customWidthChangeHandler = (value, index) => {
    let updatedTemplate = _.deepClone(templateSections);
    let currentLayout = updatedTemplate?.find((item) => item.uuid === sectionLayout?.uuid);
    currentLayout.block[index].blockStyles.width = `${value}%`;
    dispatch(setTemplateDataAction(updatedTemplate));
  };

  // console.log(sectionLayout, 'shahid');
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

        <div>
          <ColorPicker
            value={sectionLayout?.styles?.background}
            onChange={(e) => changeColorFunction(e, 'background')}
            label="Background Color"
          />
        </div>

        <div className="space-y-2">
          <Label>Container Type</Label>
          <Select
            value={sectionLayout?.properties?.containerType}
            onValueChange={changeContainerTypeSelection}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select container type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Equal Grids</SelectItem>
              <SelectItem value="flex">Custom Width</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sectionLayout?.properties?.containerType === 'flex' && (
          <div className="group space-y-3">
            <Label>Custom Width</Label>
            {sectionLayout?.block?.map((singleBlock, index) => (
              <div className="space-y-2">
                <Label htmlFor="section-margin">
                  Block - {index + 1} : {singleBlock?.blockStyles?.width || '50%'}{' '}
                </Label>
                <Slider
                  defaultValue="50%"
                  value={[getNumberFromPx(singleBlock?.blockStyles?.width || '50%')]}
                  max={100}
                  min={1}
                  step={1}
                  onValueChange={(e) => customWidthChangeHandler(e[0], index)}
                />
              </div>
            ))}
          </div>
        )}

        {/* <div className="flex items-center justify-between">
          <Label htmlFor="section-visible">Visible</Label>
          <Switch id="section-visible" defaultChecked />
        </div> */}

        {/* <Button className="w-full">Apply Settings</Button> */}
      </CardContent>
    </Card>
  );
};

export default memo(SectionSettings);
