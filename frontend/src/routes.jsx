import React from 'react';
import AuthWrapper from './views/layouts/AuthWrapper';
import Home from './views/features/home/Home';
import Login from './views/features/login/login';
import AllMosques from './views/features/supperAdmin/mosqueMgnt/AllMosques';
import MosqueDetails from './views/features/supperAdmin/mosqueMgnt/SingleMosqueDetail';

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
        <MosqueDetails />
      </AuthWrapper>
    ),
  },
  {
    path: '/superadmin/mosques',
    component: (
      <AuthWrapper>
        <AllMosques />
      </AuthWrapper>
    ),
  },
  {
    path: '/superadmin/mosques/:slug',
    component: (
      <AuthWrapper>
        <MosqueDetails />
      </AuthWrapper>
    ),
  },
];

export default allRoutesMapper;
