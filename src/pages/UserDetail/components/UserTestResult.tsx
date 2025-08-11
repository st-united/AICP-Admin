import { BookOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { getLevelNumber } from '@app/constants/level.unum';
import { formatDate } from '@app/utils';

interface UserTestResultProps {
  examData?: {
    sfiaLevel?: string;
    correctCount?: string;
    timeSpentMinutes?: string;
    examDate?: string;
    scores?: { name: string; score: number }[];
  } | null;
}

const UserTestResult: React.FC<UserTestResultProps> = ({ examData }) => {
  const { t } = useTranslation();

  if (!examData) {
    return (
      <div className='w-full md:h-[23.75rem] lg:w-6/12 py-6 px-12 shadow-md rounded-[0.75rem] text-center flex items-center justify-center'>
        <p className='text-gray-400 text-lg'>{t('TABLE.EMPTY')}</p>
      </div>
    );
  }

  return (
    <div className='w-full md:h-[23.75rem] lg:w-6/12 py-6 px-12 shadow-md rounded-[0.75rem]'>
      <h3 className='mb-4 text-lg'>
        <BookOutlined className='me-2' />
        <span>{t('USER_DETAIL.RESULT')}</span>
      </h3>

      <div className='flex flex-col gap-y-4 md:flex-row md:gap-x-8 justify-between mb-4'>
        <div className='w-full bg-[#FFE9E1] rounded-[0.75rem] p-8 flex flex-col items-center text-center'>
          <h4 className='text-[14px] mb-2'>{t('USER_DETAIL.LEVEL')}</h4>
          <p className='text-[24px] font-semibold'>{getLevelNumber(examData.sfiaLevel || '')}</p>
        </div>
        <div className='w-full bg-[#E6F1FF] rounded-[0.75rem] p-8 flex flex-col items-center text-center'>
          <h4 className='text-[0.875rem] mb-2'>{t('USER_DETAIL.CORRECT_ANSWER')}</h4>
          <p className='text-[1.5rem] font-semibold'>{examData.correctCount}</p>
        </div>
      </div>

      <div className='flex justify-between mb-4'>
        <div>
          <h4 className='text-[1.125rem] mb-2 font-normal'>{t('USER_DETAIL.TIME_TAKEN')}</h4>
          <p className='text-[1rem] font-semibold'>{examData.timeSpentMinutes}</p>
        </div>
        <div>
          <h4 className='text-[1.125rem] mb-2 font-normal'>{t('USER_DETAIL.TEST_DATE')}</h4>
          <p className='text-[1rem] font-semibold'>{formatDate(examData.examDate || '')}</p>
        </div>
      </div>

      {/* SKILLS */}
      <div className='w-full'>
        <h4 className='mb-2 text-[1.125rem] font-normal'>{t('USER_DETAIL.SKILLS_SCORE')}</h4>
        <div className='flex flex-col gap-y-2'>
          {examData.scores && Object.keys(examData.scores).length > 0 ? (
            Object.entries(examData.scores).map(([name, score], index) => (
              <div key={index} className='flex justify-between items-center'>
                <p className='text-[16px] capitalize'>{name}</p>
                <Progress
                  steps={7}
                  percent={(Number(score) / 7) * 100}
                  format={() => `${score} / 7`}
                  strokeColor='#1677ff'
                />
              </div>
            ))
          ) : (
            <p className='text-[1rem] font-semibold'>{t('TABLE.EMPTY')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTestResult;
