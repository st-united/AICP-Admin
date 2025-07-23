import { BookOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserTestResultProps {
  testData?: {
    level?: string;
    correctAnswers?: string;
    timeTaken?: string;
    testDate?: string;
    skills?: { name: string; score: number }[];
  } | null;
}

const UserTestResult: React.FC<UserTestResultProps> = ({ testData }) => {
  const { t } = useTranslation();

  const safeValue = (value?: string) => value?.trim() || t('TABLE.EMPTY');

  if (!testData) {
    return (
      <div className='w-full md:h-[380px] lg:w-6/12 py-6 px-12 shadow-md rounded-[12px] text-center flex items-center justify-center'>
        <p className='text-gray-400 text-lg'>{t('TABLE.EMPTY')}</p>
      </div>
    );
  }

  return (
    <div className='w-full md:h-[380px] lg:w-6/12 py-6 px-12 shadow-md rounded-[12px]'>
      <h3 className='mb-4 text-lg'>
        <BookOutlined className='me-2' />
        <span>{t('USER_DETAIL.RESULT')}</span>
      </h3>

      <div className='flex flex-col gap-y-4 md:flex-row md:gap-x-8 justify-between mb-4'>
        <div className='w-full bg-[#FFE9E1] rounded-[12px] p-8 flex flex-col items-center text-center'>
          <h4 className='text-[14px] mb-2'>{t('USER_DETAIL.LEVEL')}</h4>
          <p className='text-[24px] font-semibold'>{safeValue(testData.level)}</p>
        </div>
        <div className='w-full bg-[#E6F1FF] rounded-[12px] p-8 flex flex-col items-center text-center'>
          <h4 className='text-[14px] mb-2'>{t('USER_DETAIL.CORRECT_ANSWER')}</h4>
          <p className='text-[24px] font-semibold'>{safeValue(testData.correctAnswers)}</p>
        </div>
      </div>

      <div className='flex justify-between mb-4'>
        <div>
          <h4 className='text-[18px] mb-2 font-normal'>{t('USER_DETAIL.TIME_TAKEN')}</h4>
          <p className='text-[16px] font-semibold'>{safeValue(testData.timeTaken)}</p>
        </div>
        <div>
          <h4 className='text-[18px] mb-2 font-normal'>{t('USER_DETAIL.TEST_DATE')}</h4>
          <p className='text-[16px] font-semibold'>{safeValue(testData.testDate)}</p>
        </div>
      </div>

      {/* SKILLS */}
      <div className='w-full'>
        <h4 className='mb-2 text-[18px] font-normal'>{t('USER_DETAIL.SKILLS_SCORE')}</h4>
        <div className='flex flex-col gap-y-2'>
          {testData.skills && testData.skills.length > 0 ? (
            testData.skills.map((skill, index) => (
              <div key={index} className='flex justify-between items-center'>
                <p className='text-[16px]'>{skill.name}</p>
                <Progress
                  steps={7}
                  percent={(skill.score / 7) * 100}
                  format={() => `${skill.score} / 7`}
                  strokeColor='#1677ff'
                />
              </div>
            ))
          ) : (
            <p className='text-[16px] font-semibold'>{t('TABLE.EMPTY')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTestResult;
