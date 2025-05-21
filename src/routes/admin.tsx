import { lazy } from 'react';

import AdminLayout from '@app/components/templates/AdminLayout/AdminLayout';

const Dashboard = lazy(() => import('@app/pages/admin/dashboard'));
const Users = lazy(() => import('@app/pages/admin/users'));
const Settings = lazy(() => import('@app/pages/admin/settings'));

const routes = [
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
];

export default routes;
