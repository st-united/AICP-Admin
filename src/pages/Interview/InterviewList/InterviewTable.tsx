import { ColumnsType } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Table } from '@app/components/atoms';
import { DATE_TIME, TIME_SLOTS, LEVEL, LevelKey } from '@app/constants';
import { InterviewColumns } from '@app/interface/interview.interface';
import './InterviewTable.scss';

interface InterviewTableProps {
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (keys: React.Key[]) => void;
  data: InterviewColumns[];
  total: number;
  pageCount: number;
  table: { page: number; take: number };
  setTable: (value: { page: number; take: number }) => void;
}

const InterviewTable = ({
  selectedRowKeys,
  setSelectedRowKeys,
  data,
  total,
  pageCount,
  table,
  setTable,
}: InterviewTableProps) => {
  const { t } = useTranslation();

  const columns: ColumnsType<InterviewColumns> = [
    {
      title: t('INTERVIEW.FULLNAME'),
      dataIndex: 'name',
      key: 'name',
      width: 188,
    },
    {
      title: t('INTERVIEW.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 238,
    },
    {
      title: t('INTERVIEW.PHONENUMBER'),
      dataIndex: 'phone',
      key: 'phone',
      width: 176,
    },
    {
      title: t('INTERVIEW.TEST'),
      dataIndex: 'nameExamSet',
      key: 'nameExamSet',
      width: 169,
    },
    {
      title: t('INTERVIEW.RESULT'),
      dataIndex: 'level',
      key: 'level',
      width: 180,
      render: (level: LevelKey) => {
        return `${LEVEL[level]}`;
      },
    },
    {
      title: t('INTERVIEW.INTERVIEW_DATE'),
      dataIndex: 'date',
      key: 'date',
      width: 215,
      render: (_: string, record: InterviewColumns) => {
        const date = dayjs(record.date).format(DATE_TIME.DAY_MONTH_YEAR);
        const time = TIME_SLOTS[record.timeSlots];
        return `${date} ${time}`;
      },
    },
  ];

  return (
    <Table
      className='interview-table'
      rowSelection={{
        selectedRowKeys,
        onChange: (newKeys) => setSelectedRowKeys(newKeys),
      }}
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

export default InterviewTable;
