import { Form, Input, DatePicker, type FormInstance } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useMentorSchema } from './mentorSchema';
import { yupSync } from '@app/helpers';
import type { Rule } from 'antd/lib/form';

interface MentorCreateFormProps {
  form: FormInstance;
  className?: string;
}

const MentorCreateForm: React.FC<MentorCreateFormProps> = ({ form, className }) => {
  const { t } = useTranslation();
  const validator = [yupSync(useMentorSchema())] as unknown as Rule[];

  return (
    <Form form={form} layout='vertical' className={`grid grid-cols-2 gap-x-6 gap-y-4 ${className}`}>
      <Form.Item name='fullName' label={t('PROFILE.FULLNAME')} rules={validator}>
        <Input
          placeholder={t('MENTOR.PLACEHOLDER.FULLNAME') as string}
          size='large'
          className='p-3'
        />
      </Form.Item>

      <Form.Item name='email' label={t('PROFILE.EMAIL')} rules={validator}>
        <Input placeholder={t('MENTOR.PLACEHOLDER.EMAIL') as string} size='large' className='p-3' />
      </Form.Item>

      <Form.Item name='phoneNumber' label={t('PROFILE.PHONE')} rules={validator}>
        <Input placeholder={t('MENTOR.PLACEHOLDER.PHONE') as string} size='large' className='p-3' />
      </Form.Item>

      <Form.Item name='dob' label={t('PROFILE.DOB')} rules={validator}>
        <DatePicker
          placeholder={t('MENTOR.PLACEHOLDER.DOB') as string}
          className='w-full p-3'
          size='large'
        />
      </Form.Item>
    </Form>
  );
};

export default MentorCreateForm;
