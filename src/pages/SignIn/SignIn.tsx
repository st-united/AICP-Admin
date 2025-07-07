import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { Rule } from 'antd/lib/form';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { useSignInSchema } from './signInSchema';
import { yupSync } from '@app/helpers/yupSync';
import { useActivateMentorByLink, useLogin } from '@app/hooks';
import { Credentials } from '@app/interface/user.interface';

import './SignIn.scss';

const SignIn = () => {
  const { mutate: loginUser, isLoading } = useLogin();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const signInSchema = useSignInSchema();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('activateToken');
  const { mutate: activateMentor, isPending } = useActivateMentorByLink();

  useEffect(() => {
    if (token) activateMentor(token);
  }, [token]);
  if (isPending)
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spin />
      </div>
    );
  const onFinish = (values: Credentials) => {
    loginUser(values);
  };

  const validator = [yupSync(signInSchema)] as unknown as Rule[];

  return (
    <div id='container-sign-in' className='flex justify-center items-center w-[20rem] md:w-[40%]'>
      <div className='w-full h-full'>
        <div>
          <h1 className='text-primary text-[1.5rem] text-center md:text-[2rem] lg:text-[2.5rem] font-bold mb-8'>
            {t('LOGIN.TEXT')}
          </h1>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} className='grid grid-cols-2 gap-4'>
          <Form.Item className='col-span-2' name='email' rules={validator}>
            <Input
              className='!px-6 !py-4 !rounded-md !text-lg'
              placeholder={t('PLACEHOLDER.FIELD_REQUIRED', { field: t('LOGIN.EMAIL') }) ?? ''}
            />
          </Form.Item>
          <Form.Item className='col-span-2 ' name='password' rules={validator}>
            <Input.Password
              className='col-span-2 text-lg !px-6 !py-4 !rounded-md'
              placeholder={t('PLACEHOLDER.FIELD_REQUIRED', { field: t('LOGIN.PASSWORD') }) ?? ''}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined color='#69c0ff' size={24} />
                ) : (
                  <EyeInvisibleOutlined color='#69c0ff' size={24} />
                )
              }
            />
          </Form.Item>
          <div className='grid col-span-2 justify-end items-center'>
            <Button className='text-lg cursor-pointer transition-color duration-3000 border-none !outline-none !bg-transparent'>
              <Link
                to='/forgot-password'
                className='!text-primary-bold font-bold underline hover:!text-primary-light'
              >
                {t('LOGIN.FORGOT_PASSWORD')}
              </Link>
            </Button>
          </div>
          <Form.Item className='col-span-2 !mt-2'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full h-[3.5rem] !bg-primary-bold text-[1rem] font-bold border-none !outline-none !rounded-md cursor-pointer !transition-colors duration-3000 hover:!text-black'
              loading={isLoading}
            >
              {t('LOGIN.LOGIN')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
