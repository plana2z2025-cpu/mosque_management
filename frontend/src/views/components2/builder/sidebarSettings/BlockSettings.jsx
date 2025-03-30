import React, { useState, useMemo } from 'react';
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
import { Slider } from '@/components/ui/slider';
import { useSelector, useDispatch } from 'react-redux';
import { builderActions } from '@/redux/combineActions';
import _ from '@/helpers/loadash';
import { getNumberFromPx } from '@/helpers/get-initials';

const BlockSettings = () => {
  const dispatch = useDispatch();
  const { activeSection, templateSections } = useSelector((state) => state.builderToolkitState);
  const { setTemplateDataAction } = builderActions;

  const sectionLayout = useMemo(() => {
    let sectionId = activeSection?.section_uuid;
    let activeBlockId = activeSection?.block_uuid;
    let layout = templateSections?.find((item) => item?.uuid === sectionId) || {};
    let activeBlock = layout?.block?.find((item) => item?.uuid === activeBlockId);
    return { ...layout, activeBlock };
  }, [activeSection?.section_uuid, templateSections]);

  const changeSelectHandlerFunction = (value, property, isPx = false) => {
    let updatedTemplate = _.deepClone(templateSections);
    let currentLayout = updatedTemplate?.find((item) => item.uuid === sectionLayout?.uuid);
    currentLayout?.block?.forEach((item) => {
      if (item?.uuid === sectionLayout?.activeBlock?.uuid) {
        if (isPx) {
          value += 'px';
        }
        item.blockStyles[property] = value;
      }
    });
    dispatch(setTemplateDataAction(updatedTemplate));
  };

  // console.log('shahid', sectionLayout);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Block Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Justify Content</Label>
          <Select
            defaultValue="center"
            value={sectionLayout?.activeBlock?.blockStyles?.justifyContent}
            onValueChange={(e) => changeSelectHandlerFunction(e, 'justifyContent')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Justify Content" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="start"> Start</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="flex-end">Flex End</SelectItem>
              <SelectItem value="space-between">Space Between</SelectItem>
              <SelectItem value="space-around">Space Around</SelectItem>
              <SelectItem value="space-evenly">Space Evenly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Align Items</Label>
          <Select
            defaultValue="center"
            value={sectionLayout?.activeBlock?.blockStyles?.alignItems}
            onValueChange={(e) => changeSelectHandlerFunction(e, 'alignItems')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Align Items" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="start">Start</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="flex-end">Flex End</SelectItem>
              <SelectItem value="stretch">Stretch</SelectItem>
              <SelectItem value="baseline">Baseline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="section-margin">
            Gap : {sectionLayout?.activeBlock?.blockStyles?.gap}
          </Label>
          <Slider
            defaultValue="0px"
            value={[getNumberFromPx(sectionLayout?.activeBlock?.blockStyles?.gap || '0px')]}
            max={50}
            min={1}
            step={1}
            onValueChange={(e) => changeSelectHandlerFunction(e[0], 'gap', true)}
          />
        </div>

        <div className="space-y-2">
          <Label>Padding</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Top</Label>
              <Input
                type="number"
                defaultValue="2"
                max={100}
                min={1}
                onChange={(e) => changeSelectHandlerFunction(e?.target?.value, 'paddingTop', true)}
                value={getNumberFromPx(
                  sectionLayout?.activeBlock?.blockStyles?.paddingTop || '2px'
                )}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">Right</Label>
              <Input
                type="number"
                defaultValue="2"
                max={100}
                min={1}
                onChange={(e) =>
                  changeSelectHandlerFunction(e?.target?.value, 'paddingRight', true)
                }
                value={getNumberFromPx(
                  sectionLayout?.activeBlock?.blockStyles?.paddingRight || '2px'
                )}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">Bottom</Label>
              <Input
                type="number"
                defaultValue="2"
                max={100}
                min={1}
                onChange={(e) =>
                  changeSelectHandlerFunction(e?.target?.value, 'paddingBottom', true)
                }
                value={getNumberFromPx(
                  sectionLayout?.activeBlock?.blockStyles?.paddingBottom || '2px'
                )}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs">Left</Label>
              <Input
                type="number"
                defaultValue="2"
                max={100}
                min={1}
                onChange={(e) => changeSelectHandlerFunction(e?.target?.value, 'paddingLeft', true)}
                value={getNumberFromPx(
                  sectionLayout?.activeBlock?.blockStyles?.paddingLeft || '2px'
                )}
                className="h-8"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockSettings;
