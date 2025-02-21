import React, { memo, useCallback } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { mosqueActions } from '../../../redux/combineActions';
// import toast from 'react-hot-toast';

const roleDisplayConstant = {
  admin: 'Owner',
  user: 'User',
  supper_admin: 'Super Admin',
};

const breadCumbs = [{ label: 'Profile', href: null }];
const ProfileDetails = () => {
  const dispatch = useDispatch();
  const { profileDetails } = useSelector((state) => state.userProfileState);
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
    <Mainwrapper breadCumbs={breadCumbs}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile Details</CardTitle>
          <CardDescription>
            Update your personal information and manage your profile settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder={'name'}
                value={profileDetails?.name}
                //   onChange={changeHandlerFunction}
                readOnly={true}
                required
              />
            </div>

            {profileDetails?.email && (
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={'email'}
                  value={profileDetails?.email}
                  readOnly={true}
                  required
                />
              </div>
            )}

            {profileDetails?.role && (
              <div className="grid gap-2">
                <Label htmlFor="role">Role :</Label>
                <Input
                  id="role"
                  type="role"
                  name="role"
                  placeholder={'role'}
                  value={roleDisplayConstant[profileDetails?.role]}
                  readOnly={true}
                  required
                />
              </div>
            )}
          </div>

          <br />
          <Button disabled={false}>Update Profile</Button>
        </CardContent>
      </Card>

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
    </Mainwrapper>
  );
};

export default memo(ProfileDetails);
