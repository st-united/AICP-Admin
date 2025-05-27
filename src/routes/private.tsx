import { lazy } from 'react';

import AdminLayout from '@app/components/templates/AdminLayout/AdminLayout';
import UserManagement from '@app/pages/User/UserManagement';

const PrivateLayout = lazy(() => import('@app/components/templates/PrivateLayout'));
const NotFound = lazy(() => import('@app/pages/NotFound/NotFound'));
const Forbidden = lazy(() => import('@app/pages/Forbidden/Forbidden'));

const routes = [
  {
    element: <PrivateLayout />,
    children: [
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
          { path: 'mentor', element: <div></div> },
          { path: 'user', element: <UserManagement /> },
          { path: 'company', element: <div></div> },
        ],
      },
    ],
  },
];

export default routes;
