import { Outlet } from 'react-router-dom';

import Header from '@app/components/organisms/Header/Header';

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
