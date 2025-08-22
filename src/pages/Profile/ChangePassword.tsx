import { CheckOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useChangePasswordSchema } from './changePasswordSchema';
import { Lock } from '@app/assets/images';
import {
  NUMBER_LENGTH_REGEX,
  PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER,
} from '@app/constants/regex';
import { yupSync } from '@app/helpers/yupSync';
import { useChangePassword } from '@app/hooks';
import { ChangePassword } from '@app/interface/user.interface';
import type { Rule } from 'antd/lib/form';
import './changePassword.scss';

const PasswordChangeForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate: changePassword, isLoading } = useChangePassword();
  const changePasswordSchema = useChangePasswordSchema();

  const onFinish = (values: ChangePassword) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    changePassword({ oldPassword, newPassword, confirmPassword });
  };

  const values = Form.useWatch([], form); // Watch all form values

  const isLengthValid = useMemo(() => {
    return (
      NUMBER_LENGTH_REGEX.test(values?.newPassword || '') &&
      NUMBER_LENGTH_REGEX.test(values?.confirmPassword || '')
    );
  }, [values]);

  const isComplexValid = useMemo(() => {
    return (
      PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(
        values?.newPassword || '',
      ) &&
      PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER.test(
        values?.confirmPassword || '',
      )
    );
  }, [values]);

  const isAllFieldsFilled = useMemo(() => {
    return values?.oldPassword && values?.newPassword && values?.confirmPassword;
  }, [values]);

  const validator = [yupSync(changePasswordSchema)] as unknown as Rule[];

  return (
    <div className='flex justify-center w-full h-full' id='change-password-form'>
      <div className='w-full max-w-full bg-white rounded-2xl shadow flex flex-col items-center overflow-y-auto'>
        {/* Lock image */}
        <div className='flex justify-center my-5 sm:mt-4 sm:mb-0'>
          <div className='bg-[#FEF1EC] rounded-full p-3 sm:p-4'>
            <div className='bg-[#FFE3D8] rounded-full p-2 sm:p-3'>
              <img
                src={Lock}
                alt='Lock Icon'
                className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20'
              />
            </div>
          </div>
        </div>

        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          validateTrigger={['onChange', 'onBlur']}
          className='w-full lg:w-2/3 xl:w-1/2 px-5 sm:px-6 md:px-8 box-border space-y-7 sm:space-y-0'
        >
          {/* Old Password */}
          <Form.Item
            label={<span className='text-base lg:text-lg'>{t('PROFILE.OLD_PASSWORD')}</span>}
            name='oldPassword'
            rules={validator}
            required
          >
            <Input.Password
              placeholder={t<string>('PROFILE.PLACEHOLDER_OLD_PASSWORD')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              className='input-custom'
            />
          </Form.Item>

          {/* Mật khẩu mới */}
          <Form.Item
            label={<span className='text-base lg:text-lg'>{t('PROFILE.NEW_PASSWORD')}</span>}
            name='newPassword'
            rules={[
              ...validator,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('oldPassword') !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t<string>('VALIDATE.NEW_PASSWORD_DIFFERENT')));
                },
              }),
            ]}
            required
          >
            <Input.Password
              placeholder={t<string>('PROFILE.PLACEHOLDER_NEW_PASSWORD')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              onCopy={(e) => e.preventDefault()}
              className='input-custom'
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label={<span className='text-base lg:text-lg'>{t('PROFILE.CONFIRM_PASSWORD')}</span>}
            name='confirmPassword'
            dependencies={['newPassword']}
            required
            rules={[
              {
                required: true,
                message: t<string>('VALIDATE.REQUIRED', { field: t('PROFILE.CONFIRM_PASSWORD') }),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t<string>('VALIDATE.MATCH', { field: t('PROFILE.NEW_PASSWORD') })),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={t<string>('PROFILE.PLACEHOLDER_CONFIRM_PASSWORD')}
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              onPaste={(e) => e.preventDefault()}
              className='input-custom'
            />
          </Form.Item>

          {/* Password Requirements */}
          <div className='text-base text-gray-600 flex flex-col gap-y-2 !mt-4 !mb-2'>
            <div
              className={`flex items-start gap-2 ${
                isLengthValid ? 'text-green-500' : 'text-[#8B8B8B]'
              }`}
            >
              <CheckOutlined className='text-xl' />
              <div>{t<string>('PROFILE.PASSWORD_REQUIREMENT')}</div>
            </div>
            <div
              className={`flex items-start gap-2 ${
                isComplexValid ? 'text-green-500' : 'text-[#8B8B8B]'
              }`}
            >
              <CheckOutlined className='text-xl' />
              <div>{t<string>('PROFILE.PASSWORD_COMPLEXITY')}</div>
            </div>
          </div>

          {/* Submit Button */}
          <Form.Item className='flex justify-center'>
            <Button
              htmlType='submit'
              className={`w-full px-8 sm:px-12 md:px-14 !hover:bg-blue-700 h-12 text-base sm:text-lg rounded-full !text-white font-bold border-none ${
                isAllFieldsFilled ? '!bg-blue-600' : '!bg-blue-400'
              }`}
              loading={isLoading}
            >
              {t('PROFILE.SAVE')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
