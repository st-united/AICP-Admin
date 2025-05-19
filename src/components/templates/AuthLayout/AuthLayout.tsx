import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '@app/components/organisms/Header/Header';
import { RootState } from '@app/redux/store';

const AuthLayout = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth]);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
