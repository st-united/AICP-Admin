import { Input, Select, DatePicker, Button } from 'antd';
import { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

import { DATE_TIME, LevelKey, StatusKey } from '@app/constants';
import './FilterBar.scss';

const { Search } = Input;
const { RangePicker } = DatePicker;

interface Filters {
  keyword: string;
  level: string[];
  status: string[];
  dateRange: [Dayjs, Dayjs] | null;
}

interface Option<T extends string> {
  label: string;
  value: T;
}

interface FilterBarProps {
  total: number;
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
  levelOptions: Option<LevelKey>[];
  statusOptions: Option<StatusKey>[];
}

const FilterBar = ({ filters, onFiltersChange, levelOptions, statusOptions }: FilterBarProps) => {
  const { t } = useTranslation();

  const handleDateChange = (val: [Dayjs | null, Dayjs | null] | null) => {
    if (!val || val[0] === null || val[1] === null) {
      onFiltersChange({ dateRange: null });
    } else {
      onFiltersChange({ dateRange: [val[0], val[1]] });
    }
  };

  return (
    <div
      id='schedule-filter'
      className='flex flex-col md:flex-row md:flex-wrap justify-between gap-6'
    >
      <div className='flex flex-col md:flex-row gap-5 flex-1'>
        <Search
          className='min-w-[12.5rem] md:w-[12.5rem] lg:w-[18.75rem] w-full lg:max-w-[23.125rem] h-full text-base md:text-lg rounded-lg'
          placeholder={t('SCHEDULE.SEARCH_PLACEHOLDER') || ''}
          value={filters.keyword}
          onChange={(e) => onFiltersChange({ keyword: e.target.value })}
          onSearch={(val) => onFiltersChange({ keyword: val })}
        />
      </div>

      <div className='flex flex-col md:flex-row gap-5 w-full md:w-auto'>
        <div className='flex flex-col gap-1'>
          <Select
            className='min-w-[12.5rem] w-full h-[2.8125rem] text-base'
            mode='multiple'
            value={filters.level}
            onChange={(val) => onFiltersChange({ level: val })}
            placeholder={t('SCHEDULE.LEVEL')}
            allowClear
          >
            {levelOptions.map((level) => (
              <Select.Option key={level.value} value={level.value}>
                {level.label}
              </Select.Option>
            ))}
          </Select>
          {filters.level.length > 0 && (
            <Button
              size='small'
              className='text-base w-20 self-end'
              onClick={() => onFiltersChange({ level: [] })}
            >
              {t('SCHEDULE.RESET_FILTER')}
            </Button>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <Select
            className='min-w-[12.5rem] w-full h-[2.8125rem] text-base'
            mode='multiple'
            value={filters.status}
            onChange={(val) => onFiltersChange({ status: val })}
            placeholder={t('SCHEDULE.STATUS')}
            allowClear
          >
            {statusOptions.map((status) => (
              <Select.Option key={status.value} value={status.value}>
                {status.label}
              </Select.Option>
            ))}
          </Select>

          {filters.status.length > 0 && (
            <Button
              size='small'
              className='text-base w-20 self-end'
              onClick={() => onFiltersChange({ status: [] })}
            >
              {t('SCHEDULE.RESET_FILTER')}
            </Button>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <RangePicker
            className='lg:w-[12.5rem] md:w-[12.5rem] w-full h-[2.8125rem] rounded-lg'
            value={filters.dateRange}
            onChange={handleDateChange}
            format={DATE_TIME.DAY_MONTH_YEAR}
            placeholder={[t('SCHEDULE.FROM'), t('SCHEDULE.TO')]}
            allowClear
          />
          {filters.dateRange && (
            <Button
              size='small'
              className='text-base w-20 self-end'
              onClick={() => onFiltersChange({ dateRange: null })}
            >
              {t('SCHEDULE.RESET_FILTER')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
