import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import UserTable from './UserListView';
import UserSummary from './UserSummary';

function UserManagement() {
  const { t } = useTranslation();
  return (
    <div className='p-4 flex flex-col gap-6 overflow-y-auto pb-6'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center justify-center'>
          <Typography.Title className='!text-2xl !mb-0'>{t('USER.LIST')}</Typography.Title>
        </div>
        <Button className='flex items-center justify-center rounded-lg shadow-lg border-spacing-1 text-lg px-6 py-5 text-[#FE7743] font-bold'>
          {t('USER.EXPORT')}
        </Button>
      </div>
      <UserSummary />
      <UserTable />
    </div>
  );
}

export default UserManagement;
