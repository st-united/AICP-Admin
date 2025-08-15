import { Layout } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import AdminBreadcrumbs, {
  BreadcrumbItem,
} from '@app/components/molecules/Breadcrumb/AdminBreadcrumb';
import ProfileAvatar from '@app/components/organisms/Header/ProfileAvatar';
import AdminSidebar from '@app/components/organisms/Sidebar/AdminSidebar';
import MentorSidebar from '@app/components/organisms/Sidebar/MentorSidebar';
import { MENU_ITEMS_KEY } from '@app/constants/menuKey';
import { RootState } from '@app/redux/store';
import { isUUID } from '@app/utils/stringFormatters';

const AdminLayout: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const role = useSelector((state: RootState) => state.auth.user?.roles?.[0]?.name || '');
  const segments = location.pathname
    .split('/')
    .filter(Boolean)
    .filter((seg) => seg !== MENU_ITEMS_KEY.DASHBOARD);

  const customLabels = useMemo(
    () => ({
      [MENU_ITEMS_KEY.INTERVIEWER_LIST]: t('MENTOR_SIDEBAR.USER_DETAIL_INTERVIEW'),
    }),
    [t],
  );

  const menuItems = [
    { key: MENU_ITEMS_KEY.DASHBOARD, label: t('ADMIN_SIDEBAR.DASHBOARD') },
    { key: MENU_ITEMS_KEY.MENTOR, label: t('ADMIN_SIDEBAR.MENTOR') },
    { key: MENU_ITEMS_KEY.USER, label: t('ADMIN_SIDEBAR.USER') },
    { key: MENU_ITEMS_KEY.EXAM_SET, label: t('ADMIN_SIDEBAR.EXAM_SET') },
    { key: MENU_ITEMS_KEY.COMPANY, label: t('ADMIN_SIDEBAR.COMPANY') },
    { key: MENU_ITEMS_KEY.INTERVIEWER_LIST, label: t('MENTOR_SIDEBAR.INTERVIEWER_LIST') },
    { key: MENU_ITEMS_KEY.MY_CALENDER, label: t('MENTOR_SIDEBAR.MY_CALENDER') },
    { key: MENU_ITEMS_KEY.QUESTION_BANK, label: t('MENTOR_SIDEBAR.QUESTION_BANK') },
  ];

  const breadcrumbItems: BreadcrumbItem[] = [];
  let currentPath = '';
  segments.forEach((seg, index) => {
    currentPath += `/${seg}`;
    const found = menuItems.find((item) => item.key === seg);
    if (found) {
      breadcrumbItems.push({ ...found, path: currentPath });
    } else if (index > 0 && isUUID(seg) && customLabels[segments[index - 1]]) {
      breadcrumbItems.push({
        key: seg,
        label: customLabels[segments[index - 1]],
        path: currentPath,
      });
    } else {
      breadcrumbItems.push({ key: seg, label: decodeURIComponent(seg), path: currentPath });
    }
  });

  return (
    <Layout id='admin-layout'>
      {role === 'admin' ? <AdminSidebar /> : <MentorSidebar />}
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
