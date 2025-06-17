import PublicLayout from '@app/components/templates/PublicLayout';
import { SignIn } from '@app/pages';
import MentorActivation from '@app/pages/MentorActivation/MentorActivation';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <SignIn />,
      },
      {
        path: 'mentor-activation/:token',
        element: <MentorActivation />,
      },
    ],
  },
];

export default routes;
