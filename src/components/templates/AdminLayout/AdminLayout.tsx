import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

import AdminBreadcrumbs, {
  BreadcrumbItem,
} from '@app/components/molecules/Breadcrumb/AdminBreadcrumb';
import Header from '@app/components/organisms/Header/Header';
import ProfileAvatar from '@app/components/organisms/Header/ProfileAvatar';
import AdminSidebar from '@app/components/organisms/Sidebar/AdminSidebar';

const AdminLayout: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const segments = location.pathname
    .split('/')
    .filter(Boolean)
    .filter((seg) => seg !== 'dashboard');

  const menuItems = [
    { key: 'dashboard', label: t('ADMIN_SIDEBAR.DASHBOARD') },
    { key: 'mentor', label: t('ADMIN_SIDEBAR.MENTOR') },
    { key: 'user', label: t('ADMIN_SIDEBAR.USER') },
    { key: 'company', label: t('ADMIN_SIDEBAR.COMPANY') },
    { key: 'user-detail', label: t('ADMIN_BREADCRUMB.USER_DETAIL') },
  ];

  const breadcrumbItems: BreadcrumbItem[] = [];
  let currentPath = '';
  segments.forEach((seg) => {
    currentPath += `/${seg}`;
    const found = menuItems.find((item) => item.key === seg);
    if (found) {
      breadcrumbItems.push({ ...found, path: currentPath });
    } else {
      breadcrumbItems.push({ key: seg, label: decodeURIComponent(seg), path: currentPath });
    }
  });

  return (
    <Layout id='admin-layout'>
      <AdminSidebar />
      <Layout className='bg-transparent'>
        <Layout.Header className='flex items-center justify-end w-full !h-[5rem] px-6 bg-white shadow'>
          <ProfileAvatar />
        </Layout.Header>
        <div className='flex items-center justify-start pl-5'>
          <AdminBreadcrumbs items={breadcrumbItems} />
        </div>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
