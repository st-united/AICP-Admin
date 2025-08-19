import { Card, Input, Select } from 'antd';
import React, { useState } from 'react';
import './CardRecord.scss';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

const CardRecord: React.FC = () => {
  const [score, setScore] = useState<number>(7);
  const [note, setNote] = useState<string>('');
  const { t } = useTranslation();

  return (
    <Card className='card-record w-full px-4 sm:!px-2 xs:!px-2 rounded-xl border-[#00000024]'>
      <div className='mb-3 text-lg sm:text-xl'>
        <span className='font-bold text-[#fe7743]'>Câu 1</span>{' '}
        <span className='font-medium'>
          Kể về trải nghiệm của bạn khi học hoặc áp dụng một công cụ AI mới trong học tập hoặc công
          việc?
        </span>
      </div>

      <div className='bg-[#ffe9E1] rounded-lg py-4 sm:py-5 px-4 sm:px-8 lg:px-12 text-sm sm:text-base text-[#6a6a6a] mb-3'>
        <ul>
          <span className='text-black'>{t('MENTOR_RECORD.RECOMMENDATION_TITLE')}:</span>
          <li className='ml-5 sm:ml-7'>{t('MENTOR_RECORD.RECOMMENDATION_1')}</li>
          <li className='ml-5 sm:ml-7'>{t('MENTOR_RECORD.RECOMMENDATION_2')}</li>
        </ul>
      </div>

      <div className='bg-[#e6f1ff] rounded-lg py-4 sm:py-5 px-4 sm:px-8 lg:px-12 text-sm sm:text-base text-[#6a6a6a] mb-3'>
        <ul>
          <span className='text-black'>{t('MENTOR_RECORD.CRITERIA_TITLE')}:</span>
          <li className='ml-5 sm:ml-7'>{t('MENTOR_RECORD.CRITERIA_1')}</li>
          <li className='ml-5 sm:ml-7'>{t('MENTOR_RECORD.CRITERIA_2')}</li>
        </ul>
      </div>

      <div className='mb-3'>
        <p className='font-medium text-sm sm:text-base mb-1'>{t('MENTOR_RECORD.NOTE')}</p>
        <TextArea
          className='text-sm sm:text-base'
          placeholder='Nhập nội dung của bạn ...'
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
        <p className='font-medium text-sm sm:text-base'>Đánh giá điểm số:</p>
        <Select
          className='w-full sm:w-[80px] max-w-[120px]'
          value={score}
          onChange={(value) => setScore(value)}
          options={Array.from({ length: 10 }, (_, i) => ({
            value: i + 1,
            label: i + 1,
          }))}
        />
      </div>
    </Card>
  );
};

export default CardRecord;
