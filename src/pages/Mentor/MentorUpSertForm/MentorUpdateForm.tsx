import { Form, Input, DatePicker, type FormInstance } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useMentorSchema } from './mentorSchema';
import { yupSync } from '@app/helpers';
import { useGetMentorById } from '@app/hooks';
import type { Rule } from 'antd/es/form';

interface MentorUpdateFormProps {
  form: FormInstance;
  className?: string;
  mentorId: string;
}

const MentorUpdateForm: React.FC<MentorUpdateFormProps> = ({ form, className, mentorId }) => {
  const { t } = useTranslation();
  const validator = [yupSync(useMentorSchema())] as unknown as Rule[];
  const { data: mentor, isLoading } = useGetMentorById(mentorId);

  useEffect(() => {
    if (mentor && !isLoading) {
      const formValues = {
        fullName: mentor.user.fullName,
        email: mentor.user.email,
        phoneNumber: mentor.user.phoneNumber,
        dob: mentor.user.dob ? moment(mentor.user.dob) : null,
      };
      form.setFieldsValue(formValues);
    }
  }, [mentor, form]);

  return (
    <Form
      form={form}
      layout='vertical'
      className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 ${className}`}
    >
      <Form.Item name='fullName' label={t('PROFILE.FULLNAME')} rules={validator} required>
        <Input
          placeholder={t('MENTOR_ACTION.PLACEHOLDER.FULLNAME') as string}
          size='large'
          className='p-3'
        />
      </Form.Item>

      <Form.Item name='email' label={t('PROFILE.EMAIL')} rules={validator} required>
        <Input
          placeholder={t('MENTOR_ACTION.PLACEHOLDER.EMAIL') as string}
          size='large'
          className='p-3'
          disabled={true}
        />
      </Form.Item>

      <Form.Item name='phoneNumber' label={t('PROFILE.PHONE')} rules={validator} required>
        <Input
          placeholder={t('MENTOR_ACTION.PLACEHOLDER.PHONE') as string}
          size='large'
          className='p-3'
        />
      </Form.Item>

      <Form.Item name='dob' label={t('PROFILE.DOB')} rules={validator}>
        <DatePicker
          placeholder={t('MENTOR_ACTION.PLACEHOLDER.DOB') as string}
          className='w-full p-3'
          size='large'
        />
      </Form.Item>
    </Form>
  );
};

export default MentorUpdateForm;
