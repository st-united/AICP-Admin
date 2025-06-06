import { Result } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Developing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Result
      status='500'
      title={t<string>('DEVELOPING.TITLE')}
      subTitle={t<string>('DEVELOPING.SUB_TITLE')}
    />
  );
};

export default Developing;
