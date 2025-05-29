import { Modal, Button, Space, type FormInstance } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import MentorCreateForm from '../Form/MentorCreateForm';
import MentorUpdateForm from '../Form/MentorUpdateForm';
import './MentorUpSertModal.scss';

interface MentorUpSertModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: FormInstance;
  isUpdate: boolean;
  mentorId?: string;
}

const MentorUpSertModal: React.FC<MentorUpSertModalProps> = ({
  isOpen,
  onCancel,
  onOk,
  form,
  isUpdate,
  mentorId,
}) => {
  const { t } = useTranslation();

  const renderFooter = () => (
    <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-2 mt-4'>
      <Button
        key='cancel'
        className='bg-white text-[#686868] hover:bg-gray-100 hover:text-gray-700 hover:text-orange-400 hover:border-gray-300 hover:border-orange-300 border-gray-200 shadow-md rounded-lg text-lg px-5 py-3 h-fit font-bold'
        onClick={onCancel}
      >
        {t('BUTTON.CANCEL')}
      </Button>
      <Button
        key='create'
        type='primary'
        onClick={onOk}
        className='bg-orange-500 hover:bg-orange-600 hover:shadow-lg border-orange-200 hover:border-orange-300 focus:bg-orange-400 focus:border-orange-400 shadow-md rounded-lg text-lg px-5 py-3 h-fit transition-all duration-200 font-bold'
      >
        {isUpdate ? t('BUTTON.UPDATE') : t('BUTTON.CREATE')}
      </Button>
    </div>
  );

  const renderTitle = () => (
    <div className='mb-6'>
      <h2 className='sm:text-xl font-semibold text-gray-800 text-2xl'>
        {isUpdate ? t('MENTOR_ACTION.EDIT') : t('MENTOR_ACTION.ADD_NEW')}
      </h2>
      <p className='text-sm sm:text-base text-gray-500'>
        {isUpdate ? t('MENTOR_ACTION.EDIT_DESCRIPTION') : t('MENTOR_ACTION.ADD_NEW_DESCRIPTION')}
      </p>
    </div>
  );

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      className='mentor-modal !rounded-sm px-2 sm:px-4 !w-full'
      footer={null}
      closable={false}
      destroyOnClose={true}
    >
      <Space
        direction='vertical'
        className='w-full sm:w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw] px-6 py-5'
      >
        {renderTitle()}

        {isUpdate && mentorId ? (
          <MentorUpdateForm form={form} mentorId={mentorId} />
        ) : (
          <MentorCreateForm form={form} />
        )}
        {renderFooter()}
      </Space>
    </Modal>
  );
};

export default MentorUpSertModal;
