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
    <Layout>
      <Content className='content'>
        <Suspense fallback={<Spin />}>
          <ProtectedRoute>
            <Col className='outlet-layout'>
              <Outlet />
            </Col>
          </ProtectedRoute>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default PrivateLayout;
