import React from 'react';
import AuthWrapper from './views/layouts/AuthWrapper';
import Home from './views/features/home/Home';
import Login from './views/features/login/login';
import AllMosques from './views/features/supperAdmin/mosqueMgnt/AllMosques';

const allRoutesMapper = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/test',
    component: (
      <AuthWrapper>
        <AllMosques />
      </AuthWrapper>
    ),
  },
];

export default allRoutesMapper;
