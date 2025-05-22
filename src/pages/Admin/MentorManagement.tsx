import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import MentorModal from '@app/components/molecules/Modal/MentorModal';

const MentorManagement: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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
      console.log('Success:', values);
      // TODO: Call API to create mentor
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

      <MentorModal isOpen={isModalOpen} onCancel={handleCancel} onOk={handleOk} form={form} />
    </div>
  );
};

export default MentorManagement;
