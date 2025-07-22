import { lazy } from 'react';

const PrivateLayout = lazy(() => import('@app/components/templates/PrivateLayout'));
const NotFound = lazy(() => import('@app/pages/NotFound/NotFound'));
const Forbidden = lazy(() => import('@app/pages/Forbidden/Forbidden'));

import AdminLayout from '@app/components/templates/AdminLayout/AdminLayout';
import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { Mentor, TestPage } from '@app/pages';
import Developing from '@app/pages/Developing';
import Profile from '@app/pages/Profile/Profile';
import UserManagement from '@app/pages/User/UserManagement';

const routes = [
  {
    element: <PrivateLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            element: <ProfileLayout />,
            children: [
              {
                path: 'profile',
                element: <Profile />,
              },
            ],
          },
        ],
      },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '403',
        element: <Forbidden />,
      },
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Developing /> },
          { path: 'dashboard', element: <Developing /> },
          { path: 'user', element: <UserManagement /> },
          {
            path: 'mentor',
            element: <Mentor />,
          },
          { path: 'company', element: <Developing /> },
          { path: 'test', element: <TestPage /> },
        ],
      },
    ],
  },
];

export default routes;
