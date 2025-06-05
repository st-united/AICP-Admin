import { lazy } from 'react';

const PrivateLayout = lazy(() => import('@app/components/templates/PrivateLayout'));
const NotFound = lazy(() => import('@app/pages/NotFound/NotFound'));
const Forbidden = lazy(() => import('@app/pages/Forbidden/Forbidden'));

import AdminLayout from '@app/components/templates/AdminLayout/AdminLayout';
import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import { Mentor } from '@app/pages';
import Profile from '@app/pages/Profile/Profile';

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
          { path: 'dashboard', element: <div></div> },
          {
            path: 'mentor',
            element: <Mentor />,
          },
          { path: 'user', element: <div></div> },
          { path: 'company', element: <div></div> },
        ],
      },
    ],
  },
];

export default routes;
