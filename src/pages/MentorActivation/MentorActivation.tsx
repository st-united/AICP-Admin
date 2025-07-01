import { Button, Result, Spin } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useActivateMentorByLink } from '@app/hooks';

const MentorActivation = () => {
  const { t } = useTranslation();
  const { mutate: activeMentor, isLoading } = useActivateMentorByLink();
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleActivateMentor = () => {
    if (token) {
      activeMentor(token, {
        onSuccess: () => {
          setStatus('success');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        },
        onError: () => {
          setStatus('error');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-gray-50'>
        <Spin size='large' tip={t('MENTOR.ACTIVATION.LOADING')} />
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-gray-50'>
        <Result
          status='success'
          title={t('MENTOR.ACTIVATION.SUCCESS_TITLE')}
          subTitle={t('MENTOR.ACTIVATION.SUCCESS_SUBTITLE')}
        />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-gray-50'>
        <Result
          status='error'
          title={t('MENTOR.ACTIVATION.ERROR_TITLE')}
          subTitle={t('MENTOR.ACTIVATION.ERROR_SUBTITLE')}
        />
      </div>
    );
  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          {t('MENTOR.ACTIVATION.WELCOME')}{' '}
          <span className='text-3xl font-bold text-[#f89436]'>
            {t('MENTOR.ACTIVATION.DEVPLUS')}
          </span>
        </h1>
        <p className='text-gray-600 mb-6'>{t('MENTOR.ACTIVATION.DESCRIPTION')}</p>
        <Button
          type='primary'
          size='large'
          onClick={handleActivateMentor}
          className='w-full h-12 text-lg'
        >
          {t('MENTOR.ACTIVATION.ACTIVATE_BUTTON')}
        </Button>
      </div>
    </div>
  );
};

export default MentorActivation;
