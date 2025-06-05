import { useTranslation } from 'react-i18next';

import { useGetUserStats } from '@app/hooks';

const UserSummary = () => {
  const { t } = useTranslation();
  const { data: mentorStatsData } = useGetUserStats();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-xl shadow-lg bg-white lg:gap-20'>
      <div className='flex items-center justify-center p-2 md:p-3 lg:p-6'>
        <div className='flex flex-col text-center lg:text-left'>
          <div className='font-bold text-[#1570EF] text-xl md:text-xl'>{t('USER.TOTAL')}</div>
          <div className='font-semibold text-lg text-[#5D6679]'>
            {mentorStatsData?.data?.users || 0}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center p-2 md:p-3 lg:p-6'>
        <div className='flex flex-col text-center lg:text-left'>
          <div className='font-bold text-[#269900] text-xl md:text-xl'>{t('USER.ACTIVE')}</div>
          <div className='font-semibold text-lg text-[#5D6679]'>
            {mentorStatsData?.data?.activates || 0}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center p-2 md:p-3 lg:p-6'>
        <div className='flex flex-col text-center lg:text-left'>
          <div className='font-bold text-[#F36960] text-xl md:text-xl'>{t('USER.INACTIVE')}</div>
          <div className='font-semibold text-lg text-[#5D6679]'>
            {mentorStatsData?.data?.unactivates || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSummary;
