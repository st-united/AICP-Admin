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
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { UserColumns } from '@app/interface/user.interface';

interface UserDetailModalProps {
  isVisible: boolean;
  selectedUser: UserColumns | null;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ isVisible, selectedUser, onClose }) => {
  const { t } = useTranslation();

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
          <Descriptions.Item
            label={
              <span className='flex items-center gap-2'>
                <MailOutlined /> {t('USER.EMAIL')}
              </span>
            }
          >
            {selectedUser.email || t('USER.NO_DATA')}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='flex items-center gap-2'>
                <PhoneOutlined /> {t('USER.PHONE')}
              </span>
            }
          >
            {selectedUser.phoneNumber || t('USER.NO_DATA')}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='flex items-center gap-2'>
                <CalendarOutlined /> {t('USER.DATE_OF_BIRTH')}
              </span>
            }
          >
            {moment(selectedUser.dob).format('DD/MM/YYYY') || t('USER.NO_DATA')}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='flex items-center gap-2'>
                <EnvironmentOutlined /> {t('USER.PROVINCE')}
              </span>
            }
          >
            {selectedUser.province || t('USER.NO_DATA')}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='flex items-center gap-2'>
                <BankOutlined /> {t('USER.JOB')}
              </span>
            }
          >
            {selectedUser.job || t('USER.NO_DATA')}
          </Descriptions.Item>

          <Descriptions.Item label={t('USER.STATUS')}>
            <Tag
              icon={selectedUser.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              color={selectedUser.status ? 'success' : 'error'}
            >
              {selectedUser.status ? t('USER.STATUS_ACTIVE') : t('USER.STATUS_INACTIVE')}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span className='flex items-center gap-2'>
                <ClockCircleOutlined /> {t('USER.CREATED_AT')}
              </span>
            }
          >
            {moment(selectedUser.createdAt).format('DD/MM/YYYY HH:mm:ss') || t('USER.NO_DATA')}
          </Descriptions.Item>

          <Descriptions.Item label={t('USER.REFERRAL_CODE')}>
            {selectedUser.referralCode || t('USER.NO_DATA')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default UserDetailModal;
