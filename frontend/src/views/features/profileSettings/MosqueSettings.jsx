import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { mosqueActions } from '../../../redux/combineActions';

const MosqueSettings = () => {
  const dispatch = useDispatch();
  const { communityMosqueSettings } = useSelector((state) => state.mosqueState);
  const { updateMosqueSettingsAction } = mosqueActions;

  const applicationChangeHandler = useCallback(
    (e, key) => {
      const json = {};
      if (key === 'ramadanTimingsVisible') {
        json[key] = e;
      } else if (key === 'queryFormVisible') {
        json[key] = e;
      }

      dispatch(updateMosqueSettingsAction(json));
    },
    [communityMosqueSettings]
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Manage your application preferences and features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ramadan Timings Setting */}
          <div className="flex flex-row items-center justify-between space-y-2">
            <div>
              <Label htmlFor="ramadan-timings" className="text-base">
                Ramadan Timings
              </Label>
              <p className="text-sm text-muted-foreground">
                Show prayer and iftar timings during Ramadan month. This will display a special
                calendar with accurate timings for your location.
              </p>
            </div>
            <Switch
              id="ramadan-timings"
              checked={communityMosqueSettings?.ramadanTimingsVisible || false}
              onCheckedChange={(e) => applicationChangeHandler(e, 'ramadanTimingsVisible')}
            />
          </div>
          <div className="h-px bg-border" /> {/* Divider */}
          {/* Query Form Setting */}
          <div className="flex flex-row items-center justify-between space-y-2">
            <div>
              <Label htmlFor="query-form" className="text-base">
                Query Form
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable the query form feature to submit questions or requests. This helps us provide
                better assistance and support for your needs.
              </p>
            </div>
            <Switch
              id="query-form"
              checked={communityMosqueSettings?.queryFormVisible || false}
              onCheckedChange={(e) => applicationChangeHandler(e, 'queryFormVisible')}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(MosqueSettings);
