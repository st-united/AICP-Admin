import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '@app/components/organisms/Header/Header';
import { getStorageData } from '@app/config';
import { ACCESS_TOKEN } from '@app/constants';
import { RootState } from '@app/redux/store';

const AuthLayout = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!getStorageData(ACCESS_TOKEN) && !isAuth) {
      navigate('/login');
    }
  }, [isAuth, getStorageData(ACCESS_TOKEN)]);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
