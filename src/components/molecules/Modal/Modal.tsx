import { Modal, ModalProps } from 'antd';
import { FC } from 'react';
import './Modal.scss';

export const ModalComponent: FC<ModalProps> = ({ ...props }) => {
  const { open, onOk, onCancel, children, closeIcon, cancelText, okText, confirmLoading } = props;
  return (
    <Modal
      wrapClassName='status-modal'
      className='w-[36rem] px-4 status-modal_content'
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      cancelText={cancelText}
      okText={okText}
      closeIcon={closeIcon}
      confirmLoading={confirmLoading}
    >
      {children}
    </Modal>
  );
};
