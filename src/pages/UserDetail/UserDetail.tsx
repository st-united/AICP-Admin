import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { string } from 'yup';

import UserInfo from './components/UserInfo';
import Portfolio from './components/UserPorfolio';
import UserTestResult from './components/UserTestResult';
import { useGetUserDetail } from '@app/hooks';

const UserDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserDetail(id || 'a2dd0040-1b44-4d69-b090-ccdbeeaa349f');

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div className='overflow-y-auto'>
      <div className='mx-4 rounded-[1.25rem] bg-white py-8 px-14'>
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
