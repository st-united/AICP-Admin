import { useTranslation } from 'react-i18next';

interface SummaryProps {
  total: number;
  happened: number;
  notHappened: number;
  notParticipated: number;
}

const Summary = ({ total, happened, notHappened, notParticipated }: SummaryProps) => {
  const { t } = useTranslation();

  const items = [
    { label: t('SCHEDULE.TOTAL'), value: total, colorClass: 'text-[#1570EF]' },
    { label: t('SCHEDULE.HAPPENED'), value: happened, colorClass: 'text-[#269900]' },
    { label: t('SCHEDULE.NOT_HAPPENED'), value: notHappened, colorClass: 'text-[#061178]' },
    { label: t('SCHEDULE.NOT_PARTICIPATED'), value: notParticipated, colorClass: 'text-[#F36960]' },
  ];

  return (
    <div className='flex flex-col sm:flex-row justify-evenly items-stretch md:py-5 xs:py-3 rounded-lg shadow-custom bg-white'>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`md:max-w-[170px] flex flex-row gap-5 sm:flex-col flex-1 items-center sm:items-start justify-between sm:justify-center p-4 xs:py-1
          ${idx !== items.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-gray-200' : ''}`}
        >
          <span
            className={`md:font-bold xs:font-semibold text-xl sm:text-lg xs:text-lg ${item.colorClass}`}
          >
            {item.label}
          </span>
          <span className='font-semibold text-lg sm:text-base xs:text-base text-[#5D6679]'>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Summary;
