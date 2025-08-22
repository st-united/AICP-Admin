import { Modal as ModalAntd, ModalProps } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Modal: FC<ModalProps> = ({ children, ...props }) => {
  const className = props.className || '';
  const { t } = useTranslation();

  return (
    <ModalAntd
      className={`modal ${className}`}
      centered={true}
      okText={t('BUTTON.SAVE')}
      cancelText={t('BUTTON.CANCEL')}
      okButtonProps={{ className: 'button', type: 'primary' }}
      cancelButtonProps={{ style: { display: 'none' } }}
      {...props}
    >
      {children}
    </ModalAntd>
  );
};
