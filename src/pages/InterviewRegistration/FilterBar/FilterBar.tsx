import { Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import './FilterBar.scss';

const { Option } = Select;
const { Search } = Input;

interface FilterBarProps {
  total: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  levelFilter: string;
  onLevelFilterChange: (value: string) => void;
  levelOptions: string[];
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
  dateOptions: string[];
}

const FilterBar = ({
  total,
  searchValue,
  onSearchChange,
  levelFilter,
  onLevelFilterChange,
  levelOptions,
  dateFilter,
  onDateFilterChange,
  dateOptions,
}: FilterBarProps) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center justify-between gap-6'>
      <div className='flex flex-col md:flex-row items-stretch md:items-center gap-5 flex-1'>
        <p className='text-black text-base md:text-lg whitespace-nowrap'>
          {t('INTERVIEW_REGISTRATION.TOTAL')} : {total}
        </p>

        <Search
          className='flex-1 min-w-[200px] md:min-w-[250px] w-full lg:max-w-[370px] h-full text-base md:text-lg rounded-lg'
          placeholder={t('INTERVIEW_REGISTRATION.SEARCH_PLACEHOLDER') || 'Tìm kiếm'}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onSearch={onSearchChange}
        />
      </div>

      <div className='flex flex-col md:flex-row items-stretch md:items-center gap-5 w-full md:w-auto'>
        <Select
          className='min-w-[120px] h-[44px] rounded-lg interview-filter-select'
          value={levelFilter}
          onChange={onLevelFilterChange}
          placeholder={t('INTERVIEW_REGISTRATION.LEVEL')}
        >
          <Option value='all' className='!text-[18px]'>
            {t('INTERVIEW_REGISTRATION.LEVEL')}
          </Option>
          {levelOptions.map((level) => (
            <Option className='!text-[18px]' key={level} value={level}>
              {level}
            </Option>
          ))}
        </Select>

        <Select
          className=' min-w-[120px] h-[44px] rounded-lg interview-filter-select'
          value={dateFilter}
          onChange={onDateFilterChange}
          placeholder={t('INTERVIEW_REGISTRATION.DATE')}
        >
          <Option className='!text-[18px]' value='all'>
            {t('INTERVIEW_REGISTRATION.DATE')}
          </Option>
          {dateOptions.map((date) => (
            <Option className='!text-[18px]' key={date} value={date}>
              {new Date(date).toLocaleDateString()}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
