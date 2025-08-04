import { useTranslation } from 'react-i18next';

import { useGetMentorStats } from '@app/hooks';

interface SummaryProps {
  total: number;
  happened: number;
  notHappened: number;
  notParticipated: number;
}

const Summary = ({ total, happened, notHappened, notParticipated }: SummaryProps) => {
  const { t } = useTranslation();
  const { data: mentorStatsData } = useGetMentorStats();

  return (
    <div className='grid grid-cols-4 py-8 rounded-lg shadow-custom bg-white'>
      <div className='flex items-center justify-center'>
        <div className='flex justify-start flex-col gap-2'>
          <div className='font-bold text-[#1570EF] text-lg'>{t('SCHEDULE.TOTAL')}</div>
          <div className='font-semibold text-base text-[#5D6679]'>
            {mentorStatsData?.data.totalMentors}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <div className='flex justify-start flex-col gap-2'>
          <div className='font-bold text-[#269900] text-lg'>{t('SCHEDULE.HAPPENED')}</div>
          <div className='font-semibold text-base text-[#5D6679]'>
            {mentorStatsData?.data.activeMentors}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <div className='flex justify-start flex-col gap-2'>
          <div className='font-bold text-[#061178] text-lg'>{t('SCHEDULE.NOT_HAPPENED')}</div>
          <div className='font-semibold text-base text-[#5D6679]'>
            {mentorStatsData?.data.inactiveMentors}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <div className='flex justify-start flex-col gap-2'>
          <div className='font-bold text-[#F36960] text-lg'>{t('SCHEDULE.NOT_PARTICIPATED')}</div>
          <div className='font-semibold text-base text-[#5D6679]'>
            {mentorStatsData?.data.inactiveMentors}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
