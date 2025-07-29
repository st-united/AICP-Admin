import { ColumnsType } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Table } from '@app/components/atoms';
import { DATE_TIME } from '@app/constants';
import { InterviewRegistrationColumns } from '@app/interface/interviewRegistration.interface';
import './InterviewRegistrationTable.scss';

interface InterviewRegistrationTableProps {
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (keys: React.Key[]) => void;
  data: InterviewRegistrationColumns[];
  total: number;
  pageCount: number;
  table: { page: number; take: number };
  setTable: (value: { page: number; take: number }) => void;
}

const InterviewRegistrationTable = ({
  selectedRowKeys,
  setSelectedRowKeys,
  data,
  total,
  pageCount,
  table,
  setTable,
}: InterviewRegistrationTableProps) => {
  const { t } = useTranslation();

  const columns: ColumnsType<InterviewRegistrationColumns> = [
    {
      title: t('INTERVIEW_REGISTRATION.FULLNAME'),
      dataIndex: 'name',
      key: 'name',
      width: 188,
    },
    {
      title: t('INTERVIEW_REGISTRATION.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 238,
    },
    {
      title: t('INTERVIEW_REGISTRATION.PHONENUMBER'),
      dataIndex: 'phone',
      key: 'phone',
      width: 176,
    },
    {
      title: t('INTERVIEW_REGISTRATION.TEST'),
      dataIndex: 'nameExamSet',
      key: 'nameExamSet',
      width: 169,
    },
    {
      title: t('INTERVIEW_REGISTRATION.RESULT'),
      dataIndex: 'level',
      key: 'level',
      width: 172,
    },
    {
      title: t('INTERVIEW_REGISTRATION.INTERVIEW_DATE'),
      dataIndex: 'date',
      key: 'date',
      width: 215,
      render: (date: string) => dayjs(date).format(DATE_TIME.DAY_MONTH_YEAR_TIME),
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

export default InterviewRegistrationTable;
