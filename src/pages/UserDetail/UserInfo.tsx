import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserInfoProps {
  userData?: {
    name?: string;
    email?: string;
    job?: string;
    age?: string;
    phone?: string;
    province?: string;
  } | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
  const { t } = useTranslation();

  // Nếu không có dữ liệu
  if (!userData) {
    return (
      <div className='w-full md:h-[380px] lg:w-6/12 py-6 px-12 shadow-md rounded-[12px] text-center flex items-center justify-center'>
        <p className='text-gray-400 text-lg'>{t('TABLE.EMPTY')}</p>
      </div>
    );
  }

  // Helper để xử lý giá trị rỗng
  const safeValue = (value?: string) => value?.trim() || t('TABLE.EMPTY');

  return (
    <div className='w-full md:h-[380px] lg:w-6/12 py-6 px-12 shadow-md rounded-[12px]'>
      <h3 className='mb-4 text-lg'>
        <UserOutlined className='me-2' />
        <span>{t('USER_DETAIL.USER_INFO')}</span>
      </h3>
      <div className='flex justify-between items-center lg:gap-x-14'>
        <div className='flex flex-col gap-y-4 lg:gap-4'>
          <div className='flex flex-col gap-y-2'>
            <h4 className='font-normal'>{t('USER_DETAIL.FULLNAME')}</h4>
            <p className='text-lg font-semibold'>{safeValue(userData.name)}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span>{t('USER_DETAIL.EMAIL')}</span>
            <p className='text-lg font-semibold'>{safeValue(userData.email)}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span>{t('USER_DETAIL.JOB')}</span>
            <p className='text-lg font-semibold'>{safeValue(userData.job)}</p>
          </div>
        </div>
        <div className='flex flex-col gap-y-4 lg:gap-4'>
          <div className='flex flex-col gap-y-2'>
            <span>{t('USER_DETAIL.AGE')}</span>
            <p className='text-lg font-semibold'>{safeValue(userData.age)}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span>{t('USER_DETAIL.PHONE')}</span>
            <p className='text-lg font-semibold'>{safeValue(userData.phone)}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span>{t('USER_DETAIL.PROVINCE')}</span>
            <p className='text-lg font-semibold'>{safeValue(userData.province)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
