import React from 'react';
import AuthWrapper from './views/layouts/AuthWrapper';
import Home from './views/features/home/Home';
import Login from './views/features/login/login';
import AllMosques from './views/features/supperAdmin/mosqueMgnt/AllMosques';
import MosqueDetails from './views/features/supperAdmin/mosqueMgnt/SingleMosqueDetail';
import MosqueRegistrationForm from './views/features/mosque/MosqueRegistration';
import Administrators from './views/features/admin/subUsers/Administrators';
import Categories from './views/features/admin/events/Categories';
import ProfileDetails from './views/features/profileSettings/ProfileDetails';
import CreateEventForm from './views/features/admin/events/CreateEvent';
import AllEvents from './views/features/admin/events/AllEvents';
import CommunityTimings from './views/features/admin/timings/Timings';
import ExpenseCategories from './views/features/admin/expenses/Categories';
import AllExpenses from './views/features/admin/expenses/AllExpenses';
import AllBeneficiaries from './views/features/admin/payments/AllBeneficiaries';
import CreatePayeeForm from './views/features/admin/payments/createPayee';
import Analytics from './views/features/admin/dashboard/Analytics';
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
        <AllExpenses />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/timings',
    component: (
      <AuthWrapper>
        <CommunityTimings />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/events/create',
    component: (
      <AuthWrapper>
        <CreateEventForm />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/events',
    component: (
      <AuthWrapper>
        <AllEvents />
      </AuthWrapper>
    ),
  },
  {
    path: '/profile',
    component: (
      <AuthWrapper>
        <ProfileDetails />
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
    path: '/admin/expenses',
    component: (
      <AuthWrapper>
        <AllExpenses />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/expenses/payees',
    component: (
      <AuthWrapper>
        <AllBeneficiaries />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/expenses/payee/create-new-payee',
    component: (
      <AuthWrapper>
        <CreatePayeeForm />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/expenses/payee/:payeeId',
    component: (
      <AuthWrapper>
        <CreatePayeeForm />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/expenses/categories',
    component: (
      <AuthWrapper>
        <ExpenseCategories />
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
    path: '/admin/dashboard/analytics',
    component: (
      <AuthWrapper>
        <Analytics />
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
