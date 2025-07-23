import { Form, Input, DatePicker, Button, Divider, ConfigProvider } from 'antd';
import { Rule } from 'antd/lib/form';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useProfileSchema } from './profileSchema';
import CustomAvartar from '@app/components/molecules/CustomAvatar/CustomAvatar';
import { yupSync } from '@app/helpers';
import { useGetProfile, useUpdateProfile, useUploadAvatar } from '@app/hooks';
dayjs.locale('vi');

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const { data, isLoading } = useGetProfile();
  const { t } = useTranslation();
  const validator = [yupSync(useProfileSchema())] as unknown as Rule[];
  const { mutate: updateProfile } = useUpdateProfile();
  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();

  const handleCancel = () => {
    setIsEdit(false);
    form.resetFields();
  };

  const handleSubmitUpdateProfile = async (values: any) => {
    const { email, ...rest } = values;
    updateProfile(rest);
    setIsEdit(false);
  };

  const handleSubmitUploadAvatar = async (values: FormData) => {
    uploadAvatar(values);
    setIsEdit(false);
  };
  if (isLoading || !data) return null;
  return (
    <div className='relative rounded-2xl bg-white shadow-md min-h-full'>
      <div className='bg-[#FF8C5F] h-[145px] rounded-t-2xl '>
        <div className='absolute top-12 mx-auto left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0'>
          <CustomAvartar
            avatar={data?.avatarUrl}
            isEdit={isEdit}
            isUploading={isUploading}
            onAvatarChange={handleSubmitUploadAvatar}
          />
        </div>
      </div>
      <ConfigProvider locale={viVN}>
        <Form
          form={form}
          layout='vertical'
          className='w-full flex justify-center !mt-[120px] !px-4'
          onFinish={handleSubmitUpdateProfile}
          initialValues={{
            fullName: data?.fullName || '',
            email: data?.email || '',
            phoneNumber: data?.phoneNumber || '',
            dob: data.dob ? dayjs(data.dob) : null,
          }}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[900px] w-full'>
            <Form.Item
              name='fullName'
              label={
                <span>
                  {t('PROFILE.FULLNAME')} <span className='text-red-600 '> *</span>
                </span>
              }
              rules={validator}
            >
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder={t('PROFILE.FULLNAME_PLACEHOLDER') as string}
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item name='email' label={t('PROFILE.EMAIL')}>
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder={t('PROFILE.EMAIL_PLACEHOLDER') as string}
                disabled
              />
            </Form.Item>
            <Form.Item
              name='phoneNumber'
              label={
                <span>
                  {t('PROFILE.PHONE')}
                  <span className='text-red-600 '> *</span>
                </span>
              }
              rules={validator}
            >
              <Input
                className='!px-6 !py-3 !rounded-lg'
                placeholder={t('PROFILE.PHONE_PLACEHOLDER') as string}
                disabled={!isEdit}
              />
            </Form.Item>

            <Form.Item name='dob' label={t('PROFILE.DOB')} rules={validator}>
              <DatePicker
                className='!px-6 !py-3 !rounded-lg w-full'
                format='DD/MM/YYYY'
                placeholder={t('PROFILE.DOB_PLACEHOLDER') as string}
                disabled={!isEdit}
              />
            </Form.Item>

            <Divider className='md:col-span-2 border-t border-[#E5E5E5]' />
            <Form.Item className='md:col-span-2 border-t border-[#E5E5E5] !py-8'>
              <div className='flex justify-end gap-2 !flex-row'>
                {!isEdit ? (
                  <>
                    <Button
                      onClick={() => setIsEdit(true)}
                      className='!flex !justify-center !items-center !rounded-3xl !px-8 !py-4 !text-md !bg-[#FF8C5F] !border-[#FF8C5F] !text-white'
                    >
                      {t('PROFILE.EDIT_PROFILE_BTN')}
                    </Button>
                  </>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[900px]'>
                    <Button
                      onClick={handleCancel}
                      className='!flex !justify-center !items-center !rounded-2xl !px-5 !py-4 !border-[#FF8C5F] !text-[#FF8C5F] !text-md hover:!bg-[#FF8C5F] hover:!text-white'
                    >
                      {t('PROFILE.CANCEL_EDIT_PROFILE_BTN')}
                    </Button>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='!flex !justify-center !items-center !rounded-2xl !px-8 !py-4 !text-md !bg-[#FF8C5F]  !border-[#FF8C5F] !text-white'
                    >
                      {t('PROFILE.SAVE_PROFILE_BTN')}
                    </Button>
                  </div>
                )}
              </div>
            </Form.Item>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};
export default Profile;
