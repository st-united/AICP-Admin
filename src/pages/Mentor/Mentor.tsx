import { Button, Form, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MentorTable, Summary } from './MentorList';
import MentorUpSertModal from '@app/components/molecules/Modal/MentorUpSertModal';
import { useCreateMentor } from '@app/hooks';

const Mentor = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { mutate: createMentor } = useCreateMentor();

  const showMentorUpSertModal = () => {
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
    <div className='flex flex-col mt-2 gap-6 px-5 overflow-y-auto pb-6'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center justify-center'>
          <Typography.Title className='!text-2xl !mb-0'>{t('MENTOR.LIST')}</Typography.Title>
        </div>
        <div className='flex gap-2 flex-row'>
          <Button className='flex items-center justify-center rounded-lg shadow-custom border-none text-lg px-6 py-5 text-[#FE7743] font-bold'>
            {t('MENTOR.EXPORT')}
          </Button>
          <Button
            className='flex items-center justify-center rounded-lg shadow-custom border-none text-lg px-6 py-5 text-white font-bold bg-[#FE7743] hover:text-orange-500 active:bg-orange-500 focus:text-orange-500 focus:shadow-lg focus:border-orange-500 focus:border-2'
            onClick={showMentorUpSertModal}
          >
            {t('MENTOR.ADD')}
          </Button>
        </div>
      </div>
      <Summary total={0} active={0} inactive={0} />
      <MentorTable />
      <MentorUpSertModal
        isOpen={isModalOpen}
        onCancel={handleMentorCancel}
        onOk={handleMentorCreate}
        form={form}
        isUpdate={false}
      />
    </div>
  );
};

export default Mentor;
