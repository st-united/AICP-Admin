import { lazy } from 'react';

const PrivateLayout = lazy(() => import('@app/components/templates/PrivateLayout'));
const NotFound = lazy(() => import('@app/pages/NotFound/NotFound'));
const Forbidden = lazy(() => import('@app/pages/Forbidden/Forbidden'));

import AdminLayout from '@app/components/templates/AdminLayout/AdminLayout';
import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { NAVIGATE_URL } from '@app/constants';
import { Mentor } from '@app/pages';
import Developing from '@app/pages/Developing';
import { PasswordChangeForm, Profile } from '@app/pages/Profile';
import UserManagement from '@app/pages/User/UserManagement';
import UserDetail from '@app/pages/UserDetail/UserDetail';

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
              {
                path: NAVIGATE_URL.CHANGE_PASSWORD,
                element: <PasswordChangeForm />,
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
          // { path: 'company', element: <Developing /> },
          { path: 'company', element: <UserDetail /> },
        ],
      },
    ],
  },
];

export default routes;
