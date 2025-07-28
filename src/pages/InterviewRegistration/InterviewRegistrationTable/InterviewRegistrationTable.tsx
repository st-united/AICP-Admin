import { ColumnsType } from 'antd/lib/table/interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Table } from '@app/components/atoms';
import { InterviewRegistrationColumns } from '@app/interface/interviewRegistration.interface';
import { formatDateTime } from '@app/utils';
import './InterviewRegistrationTable.scss';

interface InterviewRegistrationTableProps {
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (keys: React.Key[]) => void;
  keyword: string;
  levelFilter: string;
  dateFilter: string;
  data: any[];
  total: number;
  pageCount: number;
  table: TableState;
  setTable: (value: TableState) => void;
}

interface TableState {
  page: number;
  take: number;
}

const InterviewRegistrationTable = ({
  selectedRowKeys,
  setSelectedRowKeys,
  keyword,
  levelFilter,
  dateFilter,
  data,
  total,
  pageCount,
}: InterviewRegistrationTableProps) => {
  const { t } = useTranslation();
  const [table, setTable] = useState<TableState>({ page: 1, take: 10 });

  const columns: ColumnsType<InterviewRegistrationColumns> = [
    {
      title: t('INTERVIEW_REGISTRATION.FULLNAME'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 188,
      render: (_, record) => record.user.fullName,
    },
    {
      title: t('INTERVIEW_REGISTRATION.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 238,
      render: (_, record) => record.user.email,
    },
    {
      title: t('INTERVIEW_REGISTRATION.PHONENUMBER'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 176,
      render: (_, record) => record.user.phoneNumber,
    },
    {
      title: t('INTERVIEW_REGISTRATION.TEST'),
      dataIndex: 'test',
      key: 'test',
      width: 169,
      render: (_, record) => record.exam.assessmentType,
    },
    {
      title: t('INTERVIEW_REGISTRATION.RESULT'),
      dataIndex: 'result',
      key: 'result',
      width: 172,
      render: (_, record) => record.exam.sfiaLevel,
    },
    {
      title: t('INTERVIEW_REGISTRATION.INTERVIEW_DATE'),
      dataIndex: 'interviewDate',
      key: 'interviewDate',
      width: 215,
      render: (_, record) => (
        <div className='font-medium'>{formatDateTime(record.scheduledAt)}</div>
      ),
    },
  ];

  return (
    <Table
      className='interview__table'
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
