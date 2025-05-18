import PublicLayout from '@app/components/templates/PublicLayout';
import { SignIn, ForgotPassword, ChangeNewPassword } from '@app/pages';

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
        path: 'change-password',
        element: <ChangeNewPassword />,
      },
    ],
  },
];

export default routes;
