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
    <div className='private-layout'>
      <Layout>
        <Content>
          <Suspense fallback={<Spin />}>
            <ProtectedRoute>
              <div className='h-full'>
                <Outlet />
              </div>
            </ProtectedRoute>
          </Suspense>
        </Content>
      </Layout>
    </div>
  );
};

export default PrivateLayout;
