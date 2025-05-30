import { Modal, Button, ModalProps } from 'antd';
import { FC } from 'react';
import './Modal.scss';

export const ModalComponent: FC<ModalProps> = ({ ...props }) => {
  const { open, onOk, onCancel, children, closeIcon, cancelText, okText, confirmLoading } = props;
  return (
    <Modal
      className='!w-[574px]'
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
