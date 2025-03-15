import React, { memo, useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { mosqueActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const breadCumbs = [{ label: 'Events', href: null }];

const CommunityMosqueTimings = () => {
  const { t } = useTranslation();
  const translation = t('registration');
  const { updateMosqueTimingsAction, getCommunityMosqueDetailsAction } = mosqueActions;
  const dispatch = useDispatch();
  const { communityMosqueDetail, communityMosqueSettings } = useSelector(
    (state) => state.mosqueState
  );

  const [mosqueInfo, setMosqueInfo] = useState({});
  const [info, setInfo] = useState({
    isChanged: false,
    isLoading: false,
  });

  useEffect(() => {
    if (communityMosqueDetail?.timings) {
      setMosqueInfo(communityMosqueDetail?.timings);
    }
  }, [communityMosqueDetail?.timings]);

  const timingsChangeHandler = (e) => {
    if (!info?.isChanged) {
      setInfo((prev) => ({ ...prev, isChanged: true }));
    }
    const { name, value } = e.target;
    const [salaah, type] = name.split('-');
    console.log(name);
    setMosqueInfo((prev) => ({
      ...prev,
      [salaah]: { ...prev?.[salaah], [type]: value },
    }));
  };

  const compareTimings = (oldTimings, newTimings) => {
    const changes = {};

    // Helper function to compare two timing objects
    const hasTimingChanged = (oldTiming, newTiming) => {
      if (!oldTiming || !newTiming) return true;

      // Compare all properties in the timing objects
      return Object.keys(newTiming).some((key) => oldTiming[key] !== newTiming[key]);
    };

    // Compare each prayer timing
    Object.keys(newTimings).forEach((prayer) => {
      // If prayer didn't exist in old timings or any timing changed, include whole object
      if (!oldTimings[prayer] || hasTimingChanged(oldTimings[prayer], newTimings[prayer])) {
        changes[prayer] = newTimings[prayer];
      }
    });

    return changes;
  };

  const submitHandlerFunction = async () => {
    if (info?.isLoading) return;
    const changes = compareTimings(communityMosqueDetail?.timings, mosqueInfo);
    const updateState = {};
    if (Object.keys(changes || {}).length !== 0) {
      const response = await updateMosqueTimingsAction(changes);
      if (response[0] === true) {
        toast.success('successfully updated the timings');
        const payload = {
          details: { ...response[1]?.details },
          settings: { ...communityMosqueSettings },
        };
        dispatch(getCommunityMosqueDetailsAction(payload));
        updateState.isChanged = false;
      } else {
        toast.error(response[1].message);
      }

      updateState.isLoading = false;
      setInfo((prev) => ({ prev, ...updateState }));
    }
  };

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <Card>
        <CardHeader>
          <CardTitle>{translation['timings']}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.keys(mosqueInfo ?? {}).map((prayer) => (
              <div key={prayer}>
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {prayer} <span className=" text-red-600">*</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${prayer.toLowerCase()}-azaan`}>
                      {translation['azaan-time']}
                    </Label>
                    <Input
                      name={`${prayer.toLowerCase()}-azaan`}
                      type="time"
                      value={mosqueInfo?.[prayer]?.azaan}
                      onChange={timingsChangeHandler}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${prayer.toLowerCase()}-jamaat`}>
                      {translation['jamaat-time']}
                    </Label>
                    <Input
                      name={`${prayer.toLowerCase()}-jamaat`}
                      type="time"
                      value={mosqueInfo?.[prayer]?.jamaat}
                      onChange={timingsChangeHandler}
                    />
                  </div>
                  {prayer === 'jumma' && (
                    <div className="space-y-2">
                      <Label htmlFor="qutba">{translation['qutba-time']}</Label>
                      <Input
                        id="qutba"
                        type="time"
                        value={mosqueInfo?.[prayer]?.qutba}
                        onChange={timingsChangeHandler}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {info?.isChanged && (
            <div className="flex justify-center mt-6">
              <Button className="w-full md:w-auto" onClick={submitHandlerFunction}>
                Update Timings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Mainwrapper>
  );
};

export default memo(CommunityMosqueTimings);
