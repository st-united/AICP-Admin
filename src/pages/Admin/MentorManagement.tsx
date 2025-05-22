import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import MentorModal from '@app/components/molecules/Modal/MentorModal';
import { useCreateMentor } from '@app/hooks';

const MentorManagement: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { mutate: createMentor } = useCreateMentor();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      createMentor(values);
      setIsModalOpen(false);
      form.resetFields();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <div>
      <Button type='primary' onClick={showModal}>
        {t('MENTOR.ADD_NEW')}
      </Button>

      <MentorModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        form={form}
        isUpdate={false}
      />
    </div>
  );
};

export default MentorManagement;
