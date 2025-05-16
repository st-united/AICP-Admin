import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useSignInSchema } from './signInSchema';
import { yupSync } from '@app/helpers/yupSync';
import { useLogin } from '@app/hooks';
import { Credentials } from '@app/interface/user.interface';

import './SignIn.scss';

const SignIn = () => {
  const { mutate: loginUser } = useLogin();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const signInSchema = useSignInSchema();

  const onFinish = (values: Credentials) => {
    loginUser(values);
  };

  const validator = [yupSync(signInSchema)] as unknown as Rule[];

  return (
    <div id='container-sign-in' className='flex justify-center items-center w-[20rem] md:w-[40%]'>
      <div className='w-full h-full'>
        <div>
          <h1 className='text-[1.25rem] md:text-[2rem] !text-white font-bold mb-8'>
            {t('LOGIN.TEXT')}
          </h1>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} className='grid grid-cols-2 gap-4'>
          <Form.Item className='col-span-2 ' name='email' rules={validator}>
            <Input
              className='!px-6 !py-4 !border-none !outline-none !rounded-md !text-lg'
              placeholder={t<string>('LOGIN.EMAIL')}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='password' rules={validator}>
            <Input.Password
              className='col-span-2 text-lg !bg-[#1955A0] !px-6 !py-4 !border-none !outline-none !rounded-md '
              placeholder={t<string>('LOGIN.PASSWORD')}
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
            <Button
              className='text-lg !underline text-[#1890FF] cursor-pointer hover:!text-[#096dd9] transition-color duration-3000 border-none !outline-none !bg-transparent'
              onClick={() => navigate('/forgot-password')}
            >
              {t('LOGIN.FORGOT_PASSWORD')}
            </Button>
          </div>
          <Form.Item className='col-span-2 !mt-2'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full h-[3.5rem] bg-[#1890FF] text-[1rem] font-bold border-none !outline-none !rounded-md !text-white cursor-pointer !transition-colors duration-3000 hover:!text-black !active:!bg-[#096dd9] !disabled:!bg-[#69c0ff] !disabled:!text-[#ffffff]'
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
