import { Button } from 'antd';
import React from 'react';

import CardRecord from './CardRecord/CardRecord';

interface Question {
  id: number;
  question: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      'Kể về trải nghiệm của bạn khi học hoặc áp dụng một công cụ AI mới trong học tập hoặc công việc?',
  },
  {
    id: 2,
    question:
      'Kể về trải nghiệm của bạn khi học hoặc áp dụng một công cụ AI mới trong học tập hoặc công việc?',
  },
  {
    id: 3,
    question:
      'Kể về trải nghiệm của bạn khi học hoặc áp dụng một công cụ AI mới trong học tập hoặc công việc?',
  },
];

const MentorRecord: React.FC = () => {
  const handleSaveDraft = () => {
    console.log('Lưu nháp');
  };

  const handleSubmit = () => {
    console.log('Hoàn thành');
  };

  return (
    <div className='px-4 sm:px-6 md:px-9 pb-6 overflow-y-auto'>
      <div className='w-full mx-auto p-4 sm:p-6 md:p-10 lg:p-[60px] lg:!pt-[50px] rounded-[20px] bg-white'>
        <h2 className='text-xl sm:text-2xl font-semibold mb-6 sm:mb-9 text-center sm:text-left'>
          Ghi kết quả phỏng vấn
        </h2>

        <div className='space-y-4 sm:space-y-6'>
          {questions.map((q) => (
            <CardRecord key={q.id} />
          ))}
        </div>

        <div className='flex flex-col sm:flex-row justify-end gap-3 mt-6 sm:mt-8'>
          <Button
            onClick={handleSaveDraft}
            className='w-full sm:w-auto px-4 py-4 sm:py-5 !text-black shadow-light slide-in-left 
            bg-[#b6b6b6] border !border-[#b6b6b6] 
            text-sm sm:text-base cursor-pointer 
            hover:bg-white hover:!text-[#b6b6b6] 
            transition-all duration-300'
          >
            Lưu bản nháp
          </Button>

          <Button
            onClick={handleSubmit}
            className='w-full sm:w-auto px-4 py-4 sm:py-5 
            !text-white shadow-light slide-in-left 
            bg-[#fe7743] border !border-[#fe7743] 
            text-sm sm:text-base cursor-pointer 
            hover:bg-white hover:!text-[#fe7743] 
            transition-all duration-300'
          >
            Hoàn thành
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorRecord;
