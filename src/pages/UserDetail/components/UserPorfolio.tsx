import {
  ProfileOutlined,
  CopyOutlined,
  FileOutlined,
  EyeOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { notification, Popover } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FilePreviewModal from './FilePreviewModal';
import Card from '@app/components/atoms/Card/Card';
import { getOriginalFileName } from '@app/utils/stringFormatters';

interface PortfolioProps {
  portfolioData?: {
    linkedin?: string;
    github?: string;
    certificates?: string[];
    experiences?: string[];
  } | null;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolioData }) => {
  const { t } = useTranslation();
  const [previewFile, setPreviewFile] = useState<string | undefined>(undefined);
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

  const handlePreview = (fileUrl: string) => {
    setPreviewFile(fileUrl);
  };

  const handleDownload = (url: string) => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = getOriginalFileName(url);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!portfolioData) {
    return (
      <div className='w-full shadow-md rounded-[12px] text-center py-12'>
        <p className='text-gray-400 text-lg'>{t('TABLE.EMPTY')}</p>
      </div>
    );
  }

  return (
    <Card className='w-full rounded-[0.75rem]'>
      <h3 className='mb-2 text-lg px-2 md:px-6 md:pt-6'>
        <ProfileOutlined className='me-2' />
        {t('USER_DETAIL.EXPERIENCE_PROFILE')}
      </h3>
      {/* LinkedIn & GitHub */}
      <div className='flex flex-col md:flex-row md:justify-between gap-x-0 lg:gap-x-14'>
        {/* LinkedIn */}
        <div className='w-full pb-2 px-2 md:w-6/12 md:px-6'>
          <span className='text-lg'>{t('USER_DETAIL.LINKEDIN')}</span>
          <div className='flex justify-between items-center text-[1rem] font-bold'>
            <Popover content={safeValue(portfolioData.linkedin)}>
              <p className='truncate max-w-[350px] cursor-pointer'>
                {safeValue(portfolioData.linkedin)}
              </p>
            </Popover>
            <CopyOutlined
              className='me-2 cursor-pointer'
              onClick={() => handleCopy(portfolioData.linkedin || '', 'LinkedIn')}
            />
          </div>
        </div>

        {/* Github */}
        <div className='w-full px-2 md:w-6/12 md:px-6'>
          <span className='text-lg'>{t('USER_DETAIL.GITHUB')}</span>
          <div className='flex justify-between items-center text-[1rem] font-bold'>
            <Popover content={safeValue(portfolioData.github)}>
              <p className='truncate max-w-[350px] cursor-pointer'>
                {safeValue(portfolioData.github)}
              </p>
            </Popover>
            <CopyOutlined
              className='me-2 cursor-pointer'
              onClick={() => handleCopy(portfolioData.github || '', 'Github')}
            />
          </div>
        </div>
      </div>
      {/* Certificates & Experience */}
      <div className='flex flex-col justify-between'>
        {/* Certificates */}
        <div className='w-full pb-6 px-2 md:px-6'>
          <h3 className='text-lg pb-2 font-normal'>{t('USER_DETAIL.CERTIFICATE')}</h3>
          <div className='flex flex-col gap-y-4'>
            {portfolioData.certificates && portfolioData.certificates.length > 0 ? (
              portfolioData.certificates.map((cert, index) => (
                <div
                  key={index}
                  className='flex justify-between text-lg border border-solid border-red-200 p-6 rounded-[12px]'
                >
                  <div className='flex gap-x-2 text-lg items-center'>
                    <FileOutlined />
                    <Popover content={getOriginalFileName(cert)}>
                      <p className='truncate max-w-[100px] md:max-w-full cursor-pointer'>
                        {getOriginalFileName(cert)}
                      </p>
                    </Popover>
                  </div>
                  <div className='flex gap-x-2 text-lg'>
                    <EyeOutlined
                      className='text-red-600 cursor-pointer'
                      onClick={() => handlePreview(cert)}
                    />
                    <DownloadOutlined
                      className='text-blue-600 cursor-pointer'
                      onClick={() => handleDownload(cert)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className='text-[1rem] font-bold'>{t('TABLE.EMPTY')}</p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className='w-full pb-6 px-2 md:px-6'>
          <h3 className='text-lg pb-2 font-normal'>{t('USER_DETAIL.EXPERIENCE')}</h3>
          <div className='flex flex-col gap-y-4'>
            {portfolioData.experiences && portfolioData.experiences.length > 0 ? (
              portfolioData.experiences.map((exp, index) => (
                <div
                  key={index}
                  className='flex justify-between text-lg border border-solid border-red-200 p-6 rounded-[12px]'
                >
                  <div className='flex gap-x-2 text-lg items-center'>
                    <FileOutlined />
                    <Popover content={getOriginalFileName(exp)}>
                      <p className='truncate max-w-[100px] md:max-w-full cursor-pointer'>
                        {getOriginalFileName(exp)}
                      </p>
                    </Popover>
                  </div>
                  <div className='flex gap-x-2 text-lg'>
                    <EyeOutlined
                      className='text-red-600 cursor-pointer'
                      onClick={() => handlePreview(exp)}
                    />
                    <DownloadOutlined
                      className='text-blue-600 cursor-pointer'
                      onClick={() => handleDownload(exp)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className='text-[1rem] font-bold'>{t('TABLE.EMPTY')}</p>
            )}
          </div>
        </div>
      </div>
      <FilePreviewModal
        open={!!previewFile}
        fileUrl={previewFile}
        onClose={() => setPreviewFile(undefined)}
      />
    </Card>
  );
};

export default Portfolio;
