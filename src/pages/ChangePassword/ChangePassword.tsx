import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';

import { useChangePasswordSchema } from './changePasswordSchema';
import { yupSync } from '@app/helpers/yupSync';
import { useChangeNewPassword } from '@app/hooks';
import { ChangePassword } from '@app/interface/user.interface';

import '../ForgotPassword/ForgotPassword.scss';
const ChangeNewPassword = () => {
  const { mutate: changePassword } = useChangeNewPassword();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const changePasswordSchema = useChangePasswordSchema();

  const onFinish = (values: ChangePassword) => {
    changePassword(values);
  };

  const validator = [yupSync(changePasswordSchema)] as unknown as Rule[];

  return (
    <div
      id='container-change-password'
      className='flex justify-center items-center w-[20rem] md:w-[40%]'
    >
      <div className='w-full h-full'>
        <div>
          <h1 className='text-[1.5rem] md:text-[2rem] !text-white font-bold mb-8 text-center'>
            {t('PASSWORD.RESET_PASSWORD')}
          </h1>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} className='grid grid-cols-2 gap-4'>
          <Form.Item className='col-span-2' name='oldPassword' rules={validator}>
            <Input.Password
              className='!px-6 !py-4 !bg-[#1955A0] !border-none !outline-none !rounded-md !text-lg'
              placeholder={t('PASSWORD.OLD_PASSWORD') ?? ''}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='newPassword' rules={validator}>
            <Input.Password
              className='!px-6 !py-4 !bg-[#1955A0] !border-none !outline-none !rounded-md !text-lg'
              placeholder={t('PASSWORD.NEW_PASSWORD') ?? ''}
            />
          </Form.Item>
          <Form.Item className='col-span-2' name='confirmPassword' rules={validator}>
            <Input.Password
              className='col-span-2 text-lg !bg-[#1955A0] !px-6 !py-4 !border-none !outline-none !rounded-md'
              placeholder={t('PASSWORD.NEW_PASSWORD_CONFIRM') ?? ''}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined color='#69c0ff' size={24} />
                ) : (
                  <EyeInvisibleOutlined color='#69c0ff' size={24} />
                )
              }
            />
          </Form.Item>
          <Form.Item className='col-span-2 !mt-2'>
            <Button
              type='primary'
              htmlType='submit'
              className='w-full h-[3.5rem] bg-[#1890FF] text-[1rem] font-bold border-none !outline-none !rounded-md !text-white cursor-pointer !transition-colors duration-3000 hover:!text-black !active:!bg-[#096dd9] !disabled:!bg-[#69c0ff] !disabled:!text-[#ffffff]'
            >
              {t('PASSWORD.RESET_PASSWORD')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangeNewPassword;
