import { Spin, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import UserInfo from './components/UserInfo';
import Portfolio from './components/UserPorfolio';
import UserTestResult from './components/UserTestResult';
import { useGetUserDetail } from '@app/hooks';

const UserDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useGetUserDetail(id || '');

  if (isLoading) {
    return (
      <div className='mx-4 h-full rounded-[1.25rem] bg-white py-8 mb-6 sm:px-8 lg:px-12 flex justify-center items-center'>
        <Spin size='large' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='mx-4 h-full rounded-[1.25rem] bg-whitep y-8 mb-6 sm:px-8 lg:px-12 flex justify-center items-center'>
        <Typography.Title level={3} className='text-center text-red-500'>
          {t('USER_DETAIL.ERROR')}
        </Typography.Title>
      </div>
    );
  }

  return (
    <div className='overflow-y-auto'>
      <div className='mx-4 rounded-[1.25rem] bg-white py-8 mb-6 sm:px-8 lg:px-12'>
        <Typography.Title className='!text-2xl '>{t('USER_DETAIL.INFO')}</Typography.Title>
        <div className='flex flex-col gap-y-4 lg:flex-row justify-between items-center md:gap-x-10 lg:gap-x-14 mb-6'>
          <UserInfo userData={user.personalInfo} />
          <UserTestResult examData={user.examResult} />
        </div>
        <Portfolio portfolioData={user.portfolio} />
      </div>
    </div>
  );
};

export default UserDetail;
