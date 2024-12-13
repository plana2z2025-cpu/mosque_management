import React, { memo, useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const roleDisplayConstant = {
  admin: 'Owner',
  user: 'User',
  supper_admin: 'Super Admin',
};

const breadCumbs = [{ label: 'Profile', href: null }];
const ProfileDetails = () => {
  const { profileDetails } = useSelector((state) => state.userProfileState);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Profile Details</CardTitle>
          {/* <CardDescription>Enter your email below to login to your account</CardDescription> */}
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

            <Button className="w-full" disabled={false}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </Mainwrapper>
  );
};

export default memo(ProfileDetails);
