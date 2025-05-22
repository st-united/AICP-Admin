import { Modal, Button, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import MentorForm from '../Form/MentorCreateForm';
import './MentorModal.scss';

interface MentorModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
}

const MentorModal: React.FC<MentorModalProps> = ({ isOpen, onCancel, onOk, form }) => {
  const { t } = useTranslation();

  const renderFooter = () => (
    <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-2 mt-4'>
      <Button
        key='cancel'
        className='bg-white text-[#686868] hover:bg-gray-100 hover:text-gray-700 hover:text-orange-400 hover:border-gray-300 hover:border-orange-300 border-gray-200 shadow-md rounded-lg text-lg px-5 py-3 h-fit font-bold'
        onClick={onCancel}
      >
        {t('COMMON.CANCEL')}
      </Button>
      <Button
        key='create'
        type='primary'
        onClick={onOk}
        className='bg-orange-500 hover:bg-orange-600 hover:shadow-lg border-orange-200 hover:border-orange-300 shadow-md rounded-lg text-lg px-5 py-3 h-fit transition-all duration-200 font-bold'
      >
        {t('COMMON.CREATE')}
      </Button>
    </div>
  );

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      width={800}
      className='mentor-modal !rounded-sm px-2 sm:px-4'
      footer={null}
      closable={false}
    >
      <Space direction='vertical' className='w-full px-9 py-5'>
        <div className='mb-6'>
          <h2 className='sm:text-xl font-semibold text-gray-800 text-2xl'>{t('MENTOR.ADD_NEW')}</h2>
          <p className='text-sm sm:text-base text-gray-500'>{t('MENTOR.ADD_NEW_DESCRIPTION')}</p>
        </div>

        <MentorForm form={form} />
        {renderFooter()}
      </Space>
    </Modal>
  );
};

export default MentorModal;
