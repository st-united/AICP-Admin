import AuthLayout from '@app/components/templates/AuthLayout';
import ProfileLayout from '@app/components/templates/ProfileLayout';
import PublicLayout from '@app/components/templates/PublicLayout';
import { SignIn, ForgotPassword, UpdatePassword } from '@app/pages';
import MentorActivation from '@app/pages/MentorActivation/MentorActivation';
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
        path: 'reset-password',
        element: <UpdatePassword />,
      },
      // {
      //   path: 'mentor-activation/:token',
      //   element: <MentorActivation />,
      // },
    ],
  },
];

export default routes;
