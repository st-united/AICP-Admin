import { UserOutlined } from '@ant-design/icons';
import { Popover, Tag, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '@app/components/atoms/Card/Card';

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
    <Card className='w-full md:h-[23.75rem] lg:w-6/12 rounded-[0.75rem]'>
      <div className='p-2 md:py-6 md:px-6'>
        <h3 className='mb-4 text-lg'>
          <UserOutlined className='me-2' />
          <span>{t('USER_DETAIL.USER_INFO')}</span>
        </h3>
        <div className='flex flex-col md:flex-row justify-between items-center lg:gap-x-14'>
          <div className='w-full flex flex-col gap-y-4 lg:gap-4'>
            <div className='flex flex-col gap-y-2'>
              <span className='text-lg'>{t('USER_DETAIL.FULLNAME')}</span>
              <p className='text-lg font-semibold'>{userData.fullName}</p>
            </div>
            <div className='flex flex-col gap-y-2'>
              <span className='text-lg'>{t('USER_DETAIL.EMAIL')}</span>
              <Tooltip title={safeValue(userData.email)}>
                <p className='text-lg font-semibold truncate max-w-[250px]'>
                  {safeValue(userData.email)}
                </p>
              </Tooltip>
            </div>
            <div className='flex flex-col gap-y-2'>
              <span className='text-lg'>{t('USER_DETAIL.JOB')}</span>
              <div className='flex flex-wrap gap-1 max-w-full'>
                {userData.job && userData.job.length > 0 ? (
                  <>
                    {userData.job.slice(0, 3).map((j: any, index: number) => (
                      <Tag color='blue' key={index}>
                        {typeof j === 'string' ? j : j?.name || t('TABLE.EMPTY')}
                      </Tag>
                    ))}

                    {userData.job.length > 3 && (
                      <Popover
                        title={t('USER_DETAIL.MORE_JOBS')}
                        content={
                          <div className='flex flex-wrap gap-1 max-w-xs'>
                            {userData.job.slice(3).map((j: any, index: number) => (
                              <Tag color='blue' key={index}>
                                {typeof j === 'string' ? j : j?.name || t('TABLE.EMPTY')}
                              </Tag>
                            ))}
                          </div>
                        }
                      >
                        <Tag color='default'>+{userData.job.length - 3}</Tag>
                      </Popover>
                    )}
                  </>
                ) : (
                  <span className='text-gray-400'>{t('TABLE.EMPTY')}</span>
                )}
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col gap-y-4 lg:gap-4'>
            <div className='flex flex-col gap-y-2'>
              <span className='text-lg'>{t('USER_DETAIL.AGE')}</span>
              <p className='text-lg font-semibold'>{safeValue(userData.age)}</p>
            </div>
            <div className='flex flex-col gap-y-2'>
              <span className='text-lg'>{t('USER_DETAIL.PHONE')}</span>
              <p className='text-lg font-semibold'>{safeValue(userData.phoneNumber)}</p>
            </div>
            <div className='flex flex-col gap-y-2'>
              <span className='text-lg'>{t('USER_DETAIL.PROVINCE')}</span>
              <p className='text-lg font-semibold'>{safeValue(userData.province)}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfo;
