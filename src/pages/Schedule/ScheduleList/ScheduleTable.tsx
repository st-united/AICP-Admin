import { ColumnsType } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Table } from '@app/components/atoms';
import { DATE_TIME, TIME_SLOTS, STATUS, StatusKey } from '@app/constants';
import { ScheduleColumns } from '@app/interface/schedule.interface';
import './ScheduleTable.scss';

interface ScheduleTableProps {
  data: ScheduleColumns[];
  total: number;
  pageCount: number;
  table: { page: number; take: number };
  setTable: (value: { page: number; take: number }) => void;
}

const ScheduleTable = ({ data, total, pageCount, table, setTable }: ScheduleTableProps) => {
  const { t } = useTranslation();

  console.log(data);

  const columns: ColumnsType<ScheduleColumns> = [
    {
      title: t('SCHEDULE.FULLNAME'),
      dataIndex: 'fullName',
      key: 'name',
      width: 188,
    },
    {
      title: t('SCHEDULE.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 238,
    },
    {
      title: t('SCHEDULE.PHONENUMBER'),
      dataIndex: 'phoneNumber',
      key: 'phone',
      width: 176,
    },
    {
      title: t('SCHEDULE.TEST'),
      dataIndex: 'nameExamSet',
      key: 'nameExamSet',
      width: 169,
    },
    {
      title: t('SCHEDULE.RESULT'),
      dataIndex: 'level',
      key: 'level',
      width: 172,
    },
    {
      title: t('SCHEDULE.SCHEDULE_DATE'),
      dataIndex: 'interviewDate',
      key: 'date',
      width: 215,
      render: (_: string, record: ScheduleColumns) => {
        const date = dayjs(record.date).format(DATE_TIME.DAY_MONTH_YEAR);
        const time = TIME_SLOTS[record.timeSlot];
        return `${date} ${time}`;
      },
    },
    {
      title: t('SCHEDULE.STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 185,
      render: (status: StatusKey) => {
        return <span className={`status-tag ${status}`}>{STATUS[status]}</span>;
      },
    },
  ];

  return (
    <Table
      className='schedule-table'
      columns={columns}
      dataSource={data}
      loading={false}
      paginate={{
        table,
        total,
        pageCount,
        setTable,
      }}
      onRow={() => ({
        className: 'cursor-pointer',
      })}
    />
  );
};

export default ScheduleTable;
