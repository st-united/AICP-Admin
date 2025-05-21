import { lazy } from 'react';

import AdminLayout from '@app/components/templates/AdminLayout/AdminLayout';

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
          { path: 'adviser', element: <div></div> },
          { path: 'user', element: <div></div> },
          { path: 'company', element: <div></div> },
        ],
      },
    ],
  },
];

export default routes;
