import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { MentorTable, Summary } from './MentorList';

const Mentor = () => {
  const { t } = useTranslation();
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
          <Button className='flex items-center justify-center rounded-lg  shadow-custom border-none text-lg px-6 py-5 text-white font-bold bg-[#FE7743]'>
            {t('MENTOR.ADD')}
          </Button>
        </div>
      </div>
      <Summary total={0} active={0} inactive={0} />
      <MentorTable />
    </div>
  );
};

export default Mentor;
