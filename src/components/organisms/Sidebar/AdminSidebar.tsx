import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Menu, Button, Image, Layout } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { logoDevPlus } from '@app/assets/images';
import type { MenuProps } from 'antd';

import './AdminSidebar.scss';

const { Sider } = Layout;

const AdminSidebar: React.FC = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
      label: t('ADMIN_SIDEBAR.DASHBOARD'),
    },
    {
      key: 'mentor',
      icon: <UsergroupAddOutlined />,
      label: t('ADMIN_SIDEBAR.MENTOR'),
    },
    {
      key: 'user',
      icon: <UserOutlined />,
      label: t('ADMIN_SIDEBAR.USER'),
    },
    {
      key: 'company',
      icon: <BankOutlined />,
      label: t('ADMIN_SIDEBAR.COMPANY'),
    },
  ];

  const handleToggleCollapse = () => setCollapsed((prev) => !prev);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') handleToggleCollapse();
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={`admin-sidebar bg-white !border-r-0 ${collapsed ? 'collapsed' : ''}`}
    >
      <div className='flex items-center justify-between p-4'>
        {!collapsed && (
          <Button type='text' className='p-0 h-auto' onClick={() => navigate('/dashboard')}>
            <Image width={100} src={logoDevPlus} preview={false} className='cursor-pointer' />
          </Button>
        )}

        <Button
          type='text'
          className={`text-xl p-0 h-auto ${collapsed ? 'mx-auto' : ''}`}
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
        onClick={({ key }) => navigate(`/${key}`)}
        className='admin-sidebar-menu'
      />
    </Sider>
  );
};

export default AdminSidebar;
