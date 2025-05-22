import { Form, Input, DatePicker, type FormInstance } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface MentorUpdateFormProps {
  form: FormInstance;
  className?: string;
}

const MentorUpdateForm: React.FC<MentorUpdateFormProps> = ({ form, className }) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout='vertical' className={`grid grid-cols-2 gap-x-6 gap-y-4 ${className}`}>
      <Form.Item
        name='fullName'
        label={t('PROFILE.FULLNAME')}
        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
      >
        <Input placeholder='Nhập họ tên tại đây' size='large' className='p-3' />
      </Form.Item>

      <Form.Item
        name='email'
        label={t('PROFILE.EMAIL')}
        rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}
      >
        <Input placeholder='Nhập email tại đây' size='large' className='p-3' disabled={true} />
      </Form.Item>

      <Form.Item
        name='phone'
        label={t('PROFILE.PHONE')}
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
      >
        <Input placeholder='Nhập số điện thoại tại đây' size='large' className='p-3' />
      </Form.Item>

      <Form.Item
        name='dob'
        label={t('PROFILE.DOB')}
        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
      >
        <DatePicker placeholder='Chọn ngày sinh' className='w-full p-3' size='large' />
      </Form.Item>
    </Form>
  );
};

export default MentorUpdateForm;
