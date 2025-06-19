import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Avatar, Descriptions, Modal, Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DATE_TIME } from '@app/constants';
import { UserColumns } from '@app/interface/user.interface';

interface UserDetailModalProps {
  isVisible: boolean;
  selectedUser: UserColumns | null;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ isVisible, selectedUser, onClose }) => {
  const { t } = useTranslation();

  const renderLabel = (icon: React.ReactNode, text: string) => (
    <span className='flex items-center gap-2'>
      {icon}
      {text}
    </span>
  );

  const renderValue = (value?: string | null) => value || t('USER.NO_DATA');

  return (
    <Modal
      title={
        <div className='flex items-center gap-3'>
          <Avatar size={50} src={selectedUser?.avatarUrl} icon={<UserOutlined />} />
          <span className='text-lg font-medium'>{selectedUser?.fullName}</span>
        </div>
      }
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width='65%'
    >
      {selectedUser && (
        <Descriptions bordered column={2} size='middle' className='mt-4'>
          <Descriptions.Item label={renderLabel(<MailOutlined />, t('USER.EMAIL'))}>
            {renderValue(selectedUser.email)}
          </Descriptions.Item>

          <Descriptions.Item label={renderLabel(<PhoneOutlined />, t('USER.PHONE'))}>
            {renderValue(selectedUser.phoneNumber)}
          </Descriptions.Item>

          <Descriptions.Item label={renderLabel(<CalendarOutlined />, t('USER.DATE_OF_BIRTH'))}>
            {selectedUser.dob
              ? dayjs(selectedUser.dob).format(DATE_TIME.DAY_MONTH_YEAR)
              : t('USER.NO_DATA')}
          </Descriptions.Item>

          <Descriptions.Item label={renderLabel(<EnvironmentOutlined />, t('USER.PROVINCE'))}>
            {renderValue(selectedUser.province)}
          </Descriptions.Item>

          <Descriptions.Item label={renderLabel(<BankOutlined />, t('USER.JOB'))}>
            {renderValue(selectedUser.job)}
          </Descriptions.Item>

          <Descriptions.Item label={t('USER.STATUS')}>
            <Tag
              icon={selectedUser.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              color={selectedUser.status ? 'success' : 'error'}
            >
              {selectedUser.status ? t('USER.STATUS_ACTIVE') : t('USER.STATUS_INACTIVE')}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label={renderLabel(<ClockCircleOutlined />, t('USER.CREATED_AT'))}>
            {dayjs(selectedUser.createdAt).format(DATE_TIME.DAY_MONTH_YEAR) || t('USER.NO_DATA')}
          </Descriptions.Item>

          <Descriptions.Item label={t('USER.REFERRAL_CODE')}>
            {renderValue(selectedUser.referralCode)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default UserDetailModal;
