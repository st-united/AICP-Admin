import { Input, Select, DatePicker, Button } from 'antd';
import { Dayjs } from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { DATE_TIME, LevelKey } from '@app/constants';
import './FilterBar.scss';

const { Search } = Input;
const { RangePicker } = DatePicker;

interface Option<T extends string> {
  label: string;
  value: T;
}
interface FilterBarProps {
  total: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  levelFilter: string[];
  onLevelFilterChange: (value: string[]) => void;
  levelOptions: Option<LevelKey>[];
  dateFilter: [Dayjs, Dayjs] | null;
  onDateFilterChange: (value: [Dayjs, Dayjs] | null) => void;
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
}: FilterBarProps) => {
  const { t } = useTranslation();

  const handleDateChange = useCallback(
    (val: [Dayjs | null, Dayjs | null] | null) => {
      if (!val || !val[0] || !val[1]) {
        onDateFilterChange(null);
      } else {
        onDateFilterChange([val[0], val[1]]);
      }
    },
    [onDateFilterChange],
  );

  return (
    <div
      id='interview-filter'
      className='flex flex-col md:flex-row md:flex-wrap justify-between gap-6'
    >
      <div className='flex flex-col md:flex-row gap-5 flex-1'>
        <p className='text-black text-base md:text-lg whitespace-nowrap pt-2'>
          {t('INTERVIEW.TOTAL')} : {total}
        </p>

        <Search
          className='min-w-[12.5rem] md:w-[12.5rem] lg:w-[18.75rem] w-full lg:max-w-[23.125rem] h-full text-base md:text-lg rounded-lg'
          placeholder={t('INTERVIEW.SEARCH_PLACEHOLDER') || ''}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onSearch={onSearchChange}
        />
      </div>

      <div className='flex flex-col md:flex-row gap-5 w-full md:w-auto'>
        <div className='flex flex-col gap-1'>
          <Select
            className='min-w-[12.5rem] w-full h-[2.8125rem] text-base'
            mode='multiple'
            value={levelFilter}
            onChange={onLevelFilterChange}
            placeholder={t('INTERVIEW.LEVEL')}
            allowClear
          >
            {levelOptions.map((level) => (
              <Select.Option key={level.value} value={level.value}>
                {level.label}
              </Select.Option>
            ))}
          </Select>
          {levelFilter.length > 0 && (
            <Button
              size='small'
              className='text-base w-20 self-end'
              onClick={() => onLevelFilterChange([])}
            >
              {t('INTERVIEW.RESET_FILTER')}
            </Button>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <RangePicker
            className='lg:w-[12.5rem] md:w-[12.5rem] w-full h-[2.8125rem] rounded-lg'
            value={dateFilter}
            onChange={handleDateChange}
            format={DATE_TIME.DAY_MONTH_YEAR}
            placeholder={[t('INTERVIEW.FROM'), t('INTERVIEW.TO')]}
            allowClear
          />
          {dateFilter && (
            <Button
              size='small'
              className='text-base w-20 self-end'
              onClick={() => onDateFilterChange(null)}
            >
              {t('INTERVIEW.RESET_FILTER')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
