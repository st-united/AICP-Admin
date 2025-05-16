import PublicLayout from '@app/components/templates/PublicLayout';
import ForgotPassword from '@app/pages/ForgotPassword/ForgotPassWord';

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
    ],
  },
];

export default routes;
