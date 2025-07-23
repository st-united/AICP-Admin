import { SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import React from 'react';

import './InterviewFilterBar.scss';

const { Option } = Select;

interface InterviewFilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  levelFilter: string;
  setLevelFilter: (v: string) => void;
  dateFilter: string;
  setDateFilter: (v: string) => void;
  uniqueDates: string[];
  uniqueLevels: string[];
  filteredCount: number;
  t: (key: string) => string;
}

const InterviewFilterBar: React.FC<InterviewFilterBarProps> = ({
  search,
  setSearch,
  levelFilter,
  setLevelFilter,
  dateFilter,
  setDateFilter,
  uniqueDates,
  uniqueLevels,
  filteredCount,
  t,
}) => {
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center justify-between gap-6 mt-4'>
      <div className='flex flex-col md:flex-row items-stretch md:items-center gap-5 flex-1'>
        <p className='text-black text-base md:text-lg whitespace-nowrap'>
          {t('INTERVIEW_REGISTRATION.TOTAL')} : {filteredCount}
        </p>
        <Input
          placeholder={t('TABLE.SEARCH')}
          className='flex-1 min-w-[200px] md:min-w-[250px] w-full lg:max-w-[370px] 5xl:max-w-[370px] h-[44px] text-base md:text-lg rounded-lg'
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          suffix={<SearchOutlined className='text-gray-400' />}
        />
      </div>
      <div className='flex flex-col md:flex-row items-stretch md:items-center gap-5 w-full md:w-auto'>
        <Select
          value={levelFilter}
          onChange={setLevelFilter}
          className='min-w-[120px] h-[44px] rounded-lg interview-filter-select'
        >
          <Option value='all'>{t('INTERVIEW_REGISTRATION.LEVEL')}</Option>
          {uniqueLevels.map((level) => (
            <Option key={level} value={level}>
              {level}
            </Option>
          ))}
        </Select>
        <Select
          value={dateFilter}
          onChange={setDateFilter}
          className='min-w-[120px] h-[44px] rounded-lg interview-filter-select'
        >
          <Option value='all'>{t('INTERVIEW_REGISTRATION.DATE')}</Option>
          {uniqueDates.map((date) => (
            <Option key={date} value={date}>
              {date}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default InterviewFilterBar;
