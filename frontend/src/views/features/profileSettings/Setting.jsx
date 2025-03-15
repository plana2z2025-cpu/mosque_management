import React, { memo, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfileDetails from './ProfileDetails';
import { useParams, useNavigate } from 'react-router-dom';
import MosqueProfile from './MosqueProfile';
import MosqueSettings from './MosqueSettings';

const menuItems = [
  {
    id: 'my-profile',
    label: 'My Profile',
    breadCumbs: [
      { label: 'Settings', href: null },
      { label: 'Profile', href: null },
    ],
  },
  {
    id: 'mosque-profile',
    label: 'Mosque Profile',
    breadCumbs: [
      { label: 'Settings', href: null },
      { label: 'Mosque Profile', href: null },
    ],
  },
  {
    id: 'mosque-settings',
    label: 'Mosque Settings',
    breadCumbs: [
      { label: 'Settings', href: null },
      { label: 'Mosque Settings', href: null },
    ],
  },
];

const settingsMenuMapper = {
  'my-profile': ProfileDetails,
  'mosque-profile': MosqueProfile,
  'mosque-settings': MosqueSettings,
};

const Setting = () => {
  const { settingId } = useParams();
  const navigate = useNavigate();
  const ComponentRender = useMemo(
    () => settingsMenuMapper[settingId] || settingsMenuMapper['my-profile'],
    [settingId]
  );
  const breadCumbs = useMemo(() => {
    let current = menuItems.find((item) => item.id === settingId);
    return current?.breadCumbs || menuItems[0].breadCumbs;
  }, [settingId]);

  const handleTabChange = useCallback(
    (id) => {
      navigate(`/settings/${id}`);
    },
    [settingId]
  );

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className="flex gap-6">
        <div className="flex flex-col gap-6  w-4/5">
          <ComponentRender />
        </div>

        <div className="sticky w-1/5 top-4">
          <Card className=" bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700">
            <h2 className="text-lg font-medium mb-4">Settings</h2>
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto pr-2">
              <nav className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={settingId === item.id ? 'secondary' : 'ghost'}
                    className={`justify-start text-left ${'profile' === item.id ? 'font-medium bg-gray-100 dark:bg-gray-700' : ''}`}
                    onClick={() => handleTabChange(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>
          </Card>
        </div>
      </div>
    </Mainwrapper>
  );
};

export default Setting;
