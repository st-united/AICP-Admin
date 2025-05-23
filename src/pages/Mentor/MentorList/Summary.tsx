import { useTranslation } from 'react-i18next';

import { useGetMentorStats } from '@app/hooks';

interface SummaryProps {
  total: number;
  active: number;
  inactive: number;
}

const Summary = ({ total, active, inactive }: SummaryProps) => {
  const { t } = useTranslation();
  const { data: mentorStatsData } = useGetMentorStats();

  return (
    <div className='grid grid-cols-3 py-8 rounded-lg shadow-custom bg-white'>
      <div className='flex items-center justify-center'>
        <div className='flex justify-start flex-col gap-2'>
          <div className='font-bold text-[#1570EF] text-lg'>{t('MENTOR.TOTAL')}</div>
          <div className='font-semibold text-base text-[#5D6679]'>
            {mentorStatsData?.data.totalMentors}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <div className='flex justify-start flex-col gap-2'>
          <div className='font-bold text-[#269900] text-lg'>{t('MENTOR.ACTIVE')}</div>
          <div className='font-semibold text-base text-[#5D6679]'>
            {mentorStatsData?.data.activeMentors}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <div className='flex justify-start flex-col gap-2'>
          <div className='font-bold text-[#F36960] text-lg'>{t('MENTOR.INACTIVE')}</div>
          <div className='font-semibold text-base text-[#5D6679]'>
            {mentorStatsData?.data.inactiveMentors}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
