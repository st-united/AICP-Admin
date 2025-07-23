import {
  ProfileOutlined,
  CopyOutlined,
  FileOutlined,
  EyeOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface PortfolioProps {
  portfolioData?: {
    linkedin?: string;
    github?: string;
    certificates?: string[];
    experience?: string[];
  } | null;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolioData }) => {
  const { t } = useTranslation();

  const safeValue = (value?: string) => value?.trim() || t('TABLE.EMPTY');

  const handleCopy = async (text: string, label: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      notification.success({
        message: t('USER_DETAIL.COPY_SUCCESS_TITLE'),
        description: `${label}: ${text}`,
        duration: 2,
      });
    } catch (error) {
      notification.error({
        message: t('COPY.FAIL'),
        description: t('USER_DETAI.COPY_FAIL_DESC'),
        duration: 2,
      });
    }
  };

  if (!portfolioData) {
    return (
      <div className='w-full shadow-md rounded-[12px] text-center py-12'>
        <p className='text-gray-400 text-lg'>{t('TABLE.EMPTY')}</p>
      </div>
    );
  }

  return (
    <div className='w-full shadow-md rounded-[12px]'>
      <h3 className='mb-4 text-lg px-12 pt-6'>
        <ProfileOutlined className='me-2' />
        {t('USER_DETAIL.EXPERIENCE_PROFILE')}
      </h3>

      {/* LinkedIn & GitHub */}
      <div className='flex flex-col md:flex-row md:justify-between gap-x-0 lg:gap-x-14'>
        <div className='w-full md:w-6/12 pb-6 px-12'>
          <span className='text-lg'>{t('USER_DETAIL.LINKEDIN')}</span>
          <div className='flex justify-between items-center text-lg'>
            <p>{safeValue(portfolioData.linkedin)}</p>
            <CopyOutlined
              className='me-2 cursor-pointer'
              onClick={() => handleCopy(portfolioData.linkedin || '', 'LinkedIn')}
            />
          </div>
        </div>
        <div className='w-full md:w-6/12 pb-6 px-12'>
          <span className='text-lg'>{t('USER_DETAIL.GITHUB')}</span>
          <div className='flex justify-between items-center text-lg'>
            <p>{safeValue(portfolioData.github)}</p>
            <CopyOutlined
              className='me-2 cursor-pointer'
              onClick={() => handleCopy(portfolioData.linkedin || '', 'LinkedIn')}
            />
          </div>
        </div>
      </div>

      {/* Certificates & Experience */}
      <div className='flex flex-col lg:flex-row justify-between lg:gap-x-14'>
        {/* Certificates */}
        <div className='w-full lg:w-6/12 pb-6 px-12'>
          <h3 className='text-lg pb-2 font-normal'>{t('USER_DETAIL.CERTIFICATE')}</h3>
          <div className='flex flex-col gap-y-4'>
            {portfolioData.certificates && portfolioData.certificates.length > 0 ? (
              portfolioData.certificates.map((cert, index) => (
                <div
                  key={index}
                  className='flex justify-between text-lg border border-solid border-red-200 p-6 rounded-[12px]'
                >
                  <div className='flex gap-x-2 text-lg'>
                    <FileOutlined />
                    <p>{cert}</p>
                  </div>
                  <div className='flex gap-x-2 text-lg'>
                    <EyeOutlined className='text-red-600 cursor-pointer' />
                    <DownloadOutlined className='text-blue-600 cursor-pointer' />
                  </div>
                </div>
              ))
            ) : (
              <p className='text-[18px]'>{t('TABLE.EMPTY')}</p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className='w-full lg:w-6/12 pb-6 px-12'>
          <h3 className='text-lg pb-2 font-normal'>{t('USER_DETAIL.EXPERIENCE')}</h3>
          <div className='flex flex-col gap-y-4'>
            {portfolioData.experience && portfolioData.experience.length > 0 ? (
              portfolioData.experience.map((exp, index) => (
                <div
                  key={index}
                  className='flex justify-between text-lg border border-solid border-red-200 p-6 rounded-[12px]'
                >
                  <div className='flex gap-x-2 text-lg'>
                    <FileOutlined />
                    <p>{exp}</p>
                  </div>
                  <div className='flex gap-x-2 text-lg'>
                    <EyeOutlined className='text-red-600 cursor-pointer' />
                    <DownloadOutlined className='text-blue-600 cursor-pointer' />
                  </div>
                </div>
              ))
            ) : (
              <p className='text-[18px]'>{t('TABLE.EMPTY')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
