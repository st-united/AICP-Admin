import PublicLayout from '@app/components/templates/PublicLayout';
import { Mentor } from '@app/pages';

const routes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <div className='font-bold bg-[#121212] text-white p-2'>Login Page</div>,
      },
      // {
      //   path: 'mentor',
      //   element: <Mentor />,
      // },
    ],
  },
];

export default routes;
