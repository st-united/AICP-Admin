import PublicLayout from '@app/components/templates/PublicLayout';
import ForgotPassword from '@app/pages/ForgotPassword/ForgotPassword';
import ResetPassword from '@app/pages/ResetPassword/ResetPassword';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <div className='font-bold bg-[#121212] text-white p-2'>Login Page</div>,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
];

export default routes;
