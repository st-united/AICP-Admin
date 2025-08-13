import { ColumnsType } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Table } from '@app/components/atoms';
import { DATE_TIME, NAVIGATE_URL, TIME_SLOTS } from '@app/constants';
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
  const navigate = useNavigate();

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
      width: 172,
    },
    {
      title: t('INTERVIEW.INTERVIEW_DATE'),
      dataIndex: 'date',
      key: 'date',
      width: 215,
      render: (_: string, record: InterviewColumns) => {
        const date = dayjs(record.date).format(DATE_TIME.DAY_MONTH_YEAR);
        const time = TIME_SLOTS[record.timeSlost];
        return `${date} ${time}`;
      },
    },
  ];

  return (
    <Table
      className='interview-table'
      rowSelection={{
        selectedRowKeys,
        onChange: (newKeys) => {
          setSelectedRowKeys(newKeys);
        },
      }}
      rowKey='id'
      columns={columns}
      dataSource={data}
      loading={false}
      paginate={{
        table,
        total,
        pageCount,
        setTable,
      }}
      onRow={(record) => ({
        className: 'cursor-pointer',
        onClick: () => {
          // Điều hướng đến route với id
          navigate(`${NAVIGATE_URL.INTERVIEWER_LIST}/${record.examId}`);
        },
      })}
    />
  );
};

export default InterviewTable;
