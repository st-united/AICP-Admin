import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Image, Layout, Menu, Button } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import './AdminLayout.scss';
import { logoDevPlus } from '@app/assets/images';
import Header from '@app/components/organisms/Header/Header';

const { Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggleCollapse();
    }
  };

  return (
    <Layout className='admin-layout'>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={`admin-layout__sider bg-white ${collapsed ? 'collapsed' : ''}`}
      >
        <div className='flex items-center justify-between p-4'>
          {!collapsed && (
            <Button type='text' className='p-0 h-auto' onClick={() => navigate('/')}>
              <Image width={100} src={logoDevPlus} preview={false} className='cursor-pointer' />
            </Button>
          )}

          <Button
            type='text'
            className='text-xl p-0 h-auto'
            onClick={handleToggleCollapse}
            onKeyDown={handleKeyPress}
            aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          onClick={({ key }) => navigate(`/admin/${key}`)}
          className='admin-layout__menu'
        />
      </Sider>
      <Layout>
        <Header />
        <Content className='admin-layout__content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
