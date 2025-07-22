import { BookOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UserDetail: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className='h-full lg:m-6 rounded-[20px] bg-white py-8 px-14'>
      <h1 className='text-xl font-[700] mb-6'>{t('USER_DETAIL.INFO')}</h1>
      <div className='flex justify-between items-center lg:gap-x-14 mb-6'>
        <UserInfo />
        <UserTestResult />
      </div>
      <Portfolio />
    </div>
  );
};

const UserInfo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className='w-6/12 lg:h-[380px] py-6 px-12 border border-solid rounded-[12px]'>
      <h3 className='mb-4 text-lg'>
        <UserOutlined className='me-2' />
        <span>{t('USER_DETAIL.USER_INFO')}</span>
      </h3>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col lg:gap-8'>
          <div className='flex flex-col'>
            <span>{t('USER_DETAIL.FULLNAME')}</span>
            <p className='text-lg font-semibold'>Phạm Thị Ngọc Ánh</p>
          </div>
          <div className='flex flex-col'>
            <span>{t('USER_DETAIL.EMAIL')}</span>
            <p className='text-lg font-semibold'>ptnanh@gmail.com</p>
          </div>
          <div className='flex flex-col'>
            <span>{t('USER_DETAIL.JOB')}</span>
            <p className='text-lg font-semibold'>Software Engineer</p>
          </div>
        </div>
        <div className='flex flex-col lg:gap-8'>
          <div className='flex flex-col'>
            <span>{t('USER_DETAIL.AGE')}</span>
            <p className='text-lg font-semibold'>25</p>
          </div>
          <div className='flex flex-col'>
            <span>{t('USER_DETAIL.PHONE')}</span>
            <p className='text-lg font-semibold'>0123456789</p>
          </div>
          <div className='flex flex-col'>
            <span>{t('USER_DETAIL.PROVINCE')}</span>
            <p className='text-lg font-semibold'>Hà Nội</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserTestResult: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className='w-6/12 lg:h-[380px] py-6 px-12 border border-solid border-gray-400 rounded-[12px]'>
      <h3 className='mb-4 text-lg'>
        <BookOutlined className='me-2' />
        <span>{t('USER_DETAIL.RESULT')}</span>
      </h3>
      <div className='flex justify-between mb-4'>
        <div className='w-5/12 h-1/2 bg-[#FFE9E1] rounded-[12px] p-8 flex flex-col items-center'>
          <span>{t('USER_DETAIL.LEVEL')}</span>
          <p>5</p>
        </div>
        <div className='w-5/12 h-1/2 bg-[#E6F1FF] rounded-[12px] p-8 flex flex-col items-center'>
          <span>{t('USER_DETAIL.CORRECT_ANSWER')}</span>
          <p>35/40</p>
        </div>
      </div>
      <div className='flex justify-between mb-4'>
        <div>
          <span>{t('USER_DETAIL.TIME_TAKEN')}</span>
          <p className='text-lg font-semibold'>15 phút</p>
        </div>
        <div>
          <span>{t('USER_DETAIL.TEST_DATE')}</span>
          <p className='text-lg font-semibold'>01/01/2023</p>
        </div>
      </div>
      <div>
        <span>{t('USER_DETAIL.SKILLS_SCORE')}</span>
        <div className='flex justify-between'></div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full py-6 px-12 border border-solid border-gray-400 rounded-[12px]'>
      <h3 className='mb-4 text-lg'>
        <ProfileOutlined className='me-2' />
        <span>{t('USER_DETAIL.EXPERIENCE_PROFILE')}</span>
      </h3>
      <div className='flex justify-between'>
        <div>
          <div>
            <span>{t('USER_DETAIL.LINKEDIN')}</span>
          </div>
          <div></div>
        </div>
        <div>
          <div>
            <span>{t('USER_DETAIL.GITHUB')}</span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
