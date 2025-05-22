import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import MentorModal from '@app/components/molecules/Modal/MentorModal';
import { useCreateMentor } from '@app/hooks';

const MentorManagement: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [form] = Form.useForm();

  const { mutate: createMentor } = useCreateMentor();

  const showMentorModal = () => {
    setIsModalOpen(true);
  };

  const handleMentorCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleMentorCreate = async () => {
    const values = await form.validateFields();
    createMentor(values);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <MentorModal
        isOpen={isModalOpen}
        onCancel={handleMentorCancel}
        onOk={isUpdate ? handleMentorCreate : handleMentorCreate}
        form={form}
        isUpdate={isUpdate}
      />
    </div>
  );
};

export default MentorManagement;
