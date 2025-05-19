import PublicLayout from '@app/components/templates/PublicLayout';
import { SignIn, ForgotPassword, UpdatePassword } from '@app/pages';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <SignIn />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'update-password',
        element: <UpdatePassword />,
      },
    ],
  },
];

export default routes;
