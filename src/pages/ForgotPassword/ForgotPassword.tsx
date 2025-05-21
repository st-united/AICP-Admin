import { LeftOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useForgotPasswordSchema } from './forgotPasswordSchema';
import { yupSync } from '@app/helpers/yupSync';
import { useForgotPassword } from '@app/hooks';

import './ForgotPassword.scss';

const ForgotPassword = () => {
  const { mutate: handleForgotPassword, isLoading } = useForgotPassword();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const forgotPasswordSchema = useForgotPasswordSchema();

  const onFinish = (values: { email: string }) => {
    handleForgotPassword(values.email, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };
  const handleOnClickLoginPage = () => {
    navigate('/login');
  };

  const validator = [yupSync(forgotPasswordSchema)] as unknown as Rule[];

  return (
    <div
      id='container-forgot-password'
      className='flex justify-center items-center w-[20rem] md:w-[40%]'
    >
      <div className='w-full h-full'>
        <div>
          <Button
            className='mb-12 !bg-transparent border-none !outline-none text-[1rem] md:text-lg text-primary-gray hover:text-primary-light cursor-pointer transition-colors duration-3000'
            onClick={handleOnClickLoginPage}
          >
            <LeftOutlined />
            {t('PASSWORD.BACK_TO_LOGIN')}
          </Button>
        </div>
        <div>
          <h1 className='text-[2rem] md:text-[2.5rem] text-primary font-bold text-center mb-12'>
            {t('PASSWORD.FORGOT_PASSWORD')}
          </h1>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} className='grid grid-cols-2 gap-1'>
          <Form.Item className='col-span-2 ' name='email' rules={validator}>
            <Input
              className='!px-6 !py-4 !rounded-md !text-lg'
              placeholder={t('LOGIN.EMAIL') ?? ''}
            />
          </Form.Item>
          <Form.Item className='col-span-2 !mt-2'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full h-[3.75rem] !bg-primary-bold text-[1rem] font-bold border-none !outline-none !rounded-md !text-white cursor-pointer hover:!text-black hover:!bg-primary-light transition duration-3000'
              loading={isLoading}
            >
              {!isLoading && t('PASSWORD.RESET_PASSWORD')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
