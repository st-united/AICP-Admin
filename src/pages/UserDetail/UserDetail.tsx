import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import UserInfo from './UserInfo';
import Portfolio from './UserPorfolio';
import UserTestResult from './UserTestResult';

const UserDetail: React.FC = () => {
  const { t } = useTranslation();
  const exampleUserData = {
    name: 'Phạm Thị Ngọc Ánh',
    email: 'ptnanh@gmail.com',
    job: 'Software Engineer',
    age: '25',
    phone: '0123456789',
    province: 'Hà Nội',
  };
  const exampleTestData = {
    level: '5',
    correctAnswers: '35/40',
    timeTaken: '15 phút',
    testDate: '10/07/2025',
    skills: [
      { name: 'Mindset', score: 6 },
      { name: 'Skillset', score: 5 },
      { name: 'Toolset', score: 4.5 },
    ],
  };
  const examplePortfolioData = {
    linkedin: 'https://github.com',
    github: 'https://github.com',
    certificates: ['ChungchiAI.pdf', 'ChungchiAI.pdf'],
    experience: ['ChungchiAI.pdf', 'ChungchiAI.pdf'],
  };

  return (
    <div className='overflow-y-auto'>
      <div className='mx-4 rounded-[20px] bg-white py-8 px-14'>
        <Typography.Title className='!text-2xl '>{t('USER_DETAIL.INFO')}</Typography.Title>
        <div className='flex flex-col gap-y-4 lg:flex-row justify-between items-center md:gap-x-10 lg:gap-x-14 mb-6'>
          <UserInfo userData={exampleUserData} />
          <UserTestResult testData={exampleTestData} />
        </div>
        <Portfolio portfolioData={examplePortfolioData} />
      </div>
    </div>
  );
};

export default UserDetail;
