import { ColumnsType } from 'antd/lib/table/Table';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Table } from '@app/components/atoms';
import { useGetMenteesMentor } from '@app/hooks';
import { MenteeColumns } from '@app/interface/user.interface';
import { formatDate } from '@app/utils';

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
      key: 'fullName',
      width: '15%',
      render(_, record) {
        return <>{record.fullName}</>;
      },
    },
    {
      title: t('MENTOR.MENTEE.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: '15%',
      render(_, record) {
        return <>{record.email}</>;
      },
    },
    {
      title: t('MENTOR.MENTEE.INTERVIEW_TIME'),
      dataIndex: 'interview_time',
      key: 'interview_time',
      width: '15%',
      render(_, record) {
        return <>{formatDate(record.scheduledAt, 'YYYY/MM/DD HH:mm')}</>;
      },
    },
  ];

  return <Table columns={columnsExpand} dataSource={menteeData?.data} />;
};
