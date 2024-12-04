import React from 'react';
import AuthWrapper from './views/layouts/AuthWrapper';
import Home from './views/features/home/Home';
import Login from './views/features/login/login';
import AllMosques from './views/features/supperAdmin/mosqueMgnt/AllMosques';
import MosqueDetails from './views/features/supperAdmin/mosqueMgnt/SingleMosqueDetail';
import MosqueRegistrationForm from './views/features/mosque/MosqueRegistration';
import Administrators from './views/features/admin/subUsers/Administrators';
import Categories from './views/features/admin/categories/Categories';

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
    path: '/register-mosque',
    component: <MosqueRegistrationForm />,
  },
  {
    path: '/admin',
    component: (
      <AuthWrapper>
        <Categories />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/events/categories',
    component: (
      <AuthWrapper>
        <Categories />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/sub-users',
    component: (
      <AuthWrapper>
        <Administrators />
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
