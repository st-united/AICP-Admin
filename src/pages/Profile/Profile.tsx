import { Form, Input, DatePicker, Button } from 'antd';
import { Rule } from 'antd/lib/form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useProfileSchema } from './profileSchema';
import CustomAvartar from '@app/components/molecules/CustomAvartar/CustomAvartar';
import { yupSync } from '@app/helpers';
import { useGetProfile } from '@app/hooks';

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const { data } = useGetProfile();
  const { t } = useTranslation();
  const validator = [yupSync(useProfileSchema())] as unknown as Rule[];

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
      });
    }
  }, [data, form]);

  const handleCancel = () => {
    setIsEdit(false);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    console.log('Form values:', values);
    // TODO: Add update profile API call here
    setIsEdit(false);
  };

  return (
    <>
      <div className='relative rounded-2xl bg-white h-full shadow-md'>
        <div className='bg-[#3D6ADA] h-[145px] rounded-t-2xl '>
          <div className='absolute top-12 mx-auto left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0'>
            <CustomAvartar />
          </div>
        </div>
        <Form
          form={form}
          layout='vertical'
          className='w-full flex justify-center !mt-[120px] !px-4'
          onFinish={handleSubmit}
          initialValues={{
            fullName: data?.fullName ?? '',
            email: data?.email ?? '',
            phone: data?.phone ?? '',
          }}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[900px] w-full'>
            <Form.Item name='fullName' label={t('PROFILE.FULLNAME')} rules={validator}>
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
            <Form.Item name='phone' label={t('PROFILE.PHONE')} rules={validator}>
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
            <Form.Item className='md:col-span-2 border-t border-[#E5E5E5] !py-8'>
              <div className='flex justify-end gap-2 !flex-row'>
                {!isEdit ? (
                  <>
                    <Button
                      onClick={() => setIsEdit(true)}
                      className='!flex !justify-center !items-center !rounded-3xl !px-8 !py-4 !text-md !bg-[#3D6ADA] !text-white'
                    >
                      {t('PROFILE.EDIT_PROFILE_BTN')}
                    </Button>
                  </>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[900px]'>
                    <Button
                      onClick={handleCancel}
                      className='!flex !justify-center !items-center !rounded-2xl !px-5 !py-4 !border-[#3D6ADA] !text-[#3D6ADA] !text-md hover:!bg-[#3D6ADA] hover:!text-white'
                    >
                      {t('PROFILE.CANCEL_EDIT_PROFILE_BTN')}
                    </Button>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='!flex !justify-center !items-center !rounded-2xl !px-8 !py-4 !text-md !bg-[#3D6ADA] !text-white'
                    >
                      {t('PROFILE.SAVE_PROFILE_BTN')}
                    </Button>
                  </div>
                )}
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Profile;
