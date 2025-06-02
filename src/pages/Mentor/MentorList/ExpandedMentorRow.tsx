import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/Table';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useGetMenteesMentor } from '@app/hooks';
import { MenteeColumns } from '@app/interface/user.interface';
import { formatDate } from '@app/utils';
import './ExpandedMentorRow.scss';

type Props = {
  mentorId: string;
};

export const ExpandedRow: React.FC<Props> = ({ mentorId }) => {
  const { t } = useTranslation();
  const { data: menteeData } = useGetMenteesMentor(mentorId);

  const columnsExpand: ColumnsType<MenteeColumns> = [
    {
      title: t('MENTOR.MENTEE.FULLNAME'),
      dataIndex: 'fullName',
      width: 250,
    },
    {
      title: t('MENTOR.MENTEE.EMAIL'),
      dataIndex: 'email',
      width: 250,
    },
    {
      title: t('MENTOR.MENTEE.INTERVIEW_TIME'),
      width: 250,
      render(_, record) {
        return <>{formatDate(record.scheduledAt, 'YYYY/MM/DD HH:mm')}</>;
      },
    },
  ];

  return (
    <Table
      id='expanded-table-custom'
      pagination={false}
      columns={columnsExpand}
      dataSource={menteeData?.data}
    />
  );
};
