import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Modal } from '@app/components/molecules';
import { ContentModal } from '@app/components/molecules/MentorModals/ConfirmModals/ContentModal';
import { HeaderModal } from '@app/components/molecules/MentorModals/ConfirmModals/HeaderModal';
import './confirmModal.scss';

interface ConfirmModalProps {
  quantityKey: string;
  interviewList: React.Key[];
  open: boolean;
  onClose: () => void;
  handleSetSchedule: () => void;
  loading?: boolean;
}

export const ConfirmModal = ({
  open,
  onClose,
  handleSetSchedule,
  quantityKey,
  interviewList,
  loading,
}: ConfirmModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      closable={false}
      className='p-0 m-0'
      classNames={{ content: '!rounded-3xl' }}
      width={{ xs: '90%', sm: '80%', md: '45%' }}
    >
      <div className='relative'>
        <div className='fixed-close-button absolute right-0 z-10'>
          <CloseCircleOutlined
            onClick={onClose}
            className='text-2xl cursor-pointer text-gray-500 hover:text-gray-700 md:text-3xl'
          />
        </div>

        <div className='relative flex flex-col items-center justify-center'>
          <HeaderModal title={t('MODAL.TITLE_CONFIRM_INTERVIEW_USER')} symbol='?' />

          <ContentModal message={t(quantityKey, { quantity: interviewList.length })} />

          <div className='px-3 my-6 w-full'>
            <div className='flex flex-col gap-4 md:flex-row md:justify-center md:gap-4'>
              <Button
                onClick={onClose}
                className='w-full h-full text-base text-[#686868] hover:!text-black border-2 font-semibold px-4 py-2 rounded-full me-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:bg-orange-700 border-none transition-colors duration-200 md:w-auto md:min-w-[12rem] md:px-8 md:py-3 md:text-xl'
              >
                {t('MODAL.CANCEL')}
              </Button>

              <Button
                onClick={handleSetSchedule}
                loading={loading}
                disabled={loading}
                className='w-full h-full text-base font-semibold border !border-primary px-3 py-2 rounded-full !bg-orange-500 hover:!bg-white hover:!text-primary !text-white transition-colors duration-200 md:w-48 md:px-6 md:py-3 md:text-xl'
              >
                {t('MODAL.CONFIRM')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
