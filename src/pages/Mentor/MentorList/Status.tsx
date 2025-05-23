import { useTranslation } from 'react-i18next';

interface StatusProps {
  isActive: boolean;
}

const Status = ({ isActive }: StatusProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${
        isActive ? 'bg-[#135200]' : 'bg-[#AD2102]'
      } px-4 py-2 rounded-lg text-center text-base font-medium text-white`}
    >
      {isActive ? t('STATUS.ACTIVE') : t('STATUS.INACTIVE')}
    </div>
  );
};

export default Status;
