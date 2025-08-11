import { UserOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserInfoProps {
  userData?: {
    fullName?: string;
    email?: string;
    job?: [];
    age?: string;
    phoneNumber?: string;
    province?: string;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
  const { t } = useTranslation();

  if (!userData) {
    return (
      <div className='w-full md:h-[18.75rem] lg:w-6/12 py-6 px-12 shadow-md rounded-[0.75rem] text-center flex items-center justify-center'>
        <p className='text-gray-400 text-lg'>{t('TABLE.EMPTY')}</p>
      </div>
    );
  }

  const safeValue = (value?: string) => value?.trim() || t('TABLE.EMPTY');

  return (
    <div className='w-full md:h-[23.75rem] lg:w-6/12 py-6 px-12 shadow-md rounded-[0.75rem]'>
      <h3 className='mb-4 text-lg'>
        <UserOutlined className='me-2' />
        <span>{t('USER_DETAIL.USER_INFO')}</span>
      </h3>
      <div className='flex justify-between items-center lg:gap-x-14'>
        <div className='flex flex-col gap-y-4 lg:gap-4'>
          <div className='flex flex-col gap-y-2'>
            <h4 className='font-normal'>{t('USER_DETAIL.FULLNAME')}</h4>
            <p className='text-lg font-semibold'>{userData.fullName}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span>{t('USER_DETAIL.EMAIL')}</span>
            <p className='text-lg font-semibold'>{safeValue(userData.email)}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span>{t('USER_DETAIL.JOB')}</span>
            <div className='flex flex-wrap gap-2'>
              {userData.job && userData.job.length > 0 ? (
                userData.job.map((j: any, index: number) => (
                  <Tag color='blue' key={index}>
                    {typeof j === 'string' ? j : j?.name || t('TABLE.EMPTY')}
                  </Tag>
                ))
              ) : (
                <span className='text-gray-400'>{t('TABLE.EMPTY')}</span>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-y-4 lg:gap-4'>
          <div className='flex flex-col gap-y-2'>
            <span>{t('USER_DETAIL.AGE')}</span>
            <p className='text-lg font-semibold'>{userData.age}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span>{t('USER_DETAIL.PHONE')}</span>
            <p className='text-lg font-semibold'>{safeValue(userData.phoneNumber)}</p>
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
