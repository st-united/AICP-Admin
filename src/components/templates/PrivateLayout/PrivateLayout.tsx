import { Layout, Col, Spin } from 'antd';
import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute';
import { useGetProfile } from '@app/hooks/useProfile';
import './PrivateLayout.scss';

const { Content } = Layout;

const PrivateLayout: FC = () => {
  useGetProfile();
  return (
    <div className='private-layout h-screen w-full overflow-hidden'>
      <Layout className='h-full'>
        <Content className='h-full'>
          <Suspense fallback={<Spin className='flex justify-center items-center h-full' />}>
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          </Suspense>
        </Content>
      </Layout>
    </div>
  );
};

export default PrivateLayout;
