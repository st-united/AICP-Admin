import { WarningOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ModalComponent } from '@app/components/molecules/index';
import { useActivateMentorAccount, useDeactivateMentorAccount } from '@app/hooks/useMentor';

interface StatusProps {
  isActive: boolean;
  id: number;
}

const Status: FC<StatusProps> = ({ id, isActive }) => {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { mutate: handleDeactivateMentorAccount, isLoading: isLoadingDeactive } =
    useDeactivateMentorAccount();
  const { mutate: handleActivateMentorAccount, isLoading: isLoadingActive } =
    useActivateMentorAccount();
  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const handleSubmit = () => {
    if (isActive) {
      handleDeactivateMentorAccount(id, {
        onSuccess: (data) => {
          setIsOpenModal(false);
        },
        onError: (error) => {
          setIsOpenModal(false);
        },
      });
    } else {
      handleActivateMentorAccount(id, {
        onSuccess: (data) => {
          setIsOpenModal(false);
        },
        onError: (error) => {
          setIsOpenModal(false);
        },
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpenModal(true)}
        className={`${
          isActive ? 'bg-[#135200]' : 'bg-[#AD2102]'
        } cursor-pointer px-4 py-2 rounded-lg text-center text-base font-medium text-white w-full`}
      >
        {isActive ? t('STATUS.ACTIVE') : t('STATUS.INACTIVE')}
      </button>
      <ModalComponent
        open={isOpenModal}
        cancelText={t<string>('MENTOR.CANCEL')}
        okText={t<string>('MENTOR.CONFIRM')}
        onCancel={handleCancel}
        onOk={handleSubmit}
        closeIcon={true}
        confirmLoading={isLoadingDeactive || isLoadingActive}
      >
        <div className='text-center mb-6'>
          <div className='flex justify-center items-center'>
            <div
              className={`h-[98px] w-[98px] flex justify-center items-center rounded-full bg-red-500 bg-opacity-10`}
            >
              <div
                className={`flex items-center justify-center w-20 h-20 rounded-full bg-red-500 bg-opacity-20`}
              >
                <WarningOutlined className='text-5xl text-red-500' />
              </div>
            </div>
          </div>
        </div>
        <h1 className='text-2xl text-center font-bold'>
          {isActive
            ? t<string>('MENTOR.DISABLED_ACCOUNT_TITLE')
            : t<string>('MENTOR.ACTIVE_ACCOUNT_TITLE')}
        </h1>
        <div className='my-6'>
          <p className='text-primaryTextColor text-center text-base leading-[22px]'>
            {isActive
              ? t<string>('MENTOR.DISABLED_ACCOUNT_DESCRIPTION')
              : t<string>('MENTOR.ACTIVE_ACCOUNT_DESCRIPTION')}
          </p>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Status;
