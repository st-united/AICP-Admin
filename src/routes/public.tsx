import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import PublicLayout from '@app/components/templates/PublicLayout';
import { SignIn, ForgotPassword, UpdatePassword } from '@app/pages';
import Profile from '@app/pages/Profile/Profile';

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
];

export default routes;
