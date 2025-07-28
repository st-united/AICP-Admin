import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

interface SelectedBarProps {
  selectedCount: number;
  onAction: () => void;
}

const SelectedBar = ({ selectedCount, onAction }: SelectedBarProps) => {
  const { t } = useTranslation();

  return (
    <div className='interview-selected-bar bg-[#ffe9e187] border border-orange-100 rounded-lg px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3'>
      <span className='text-black text-base md:text-lg font-semibold'>
        {t('INTERVIEW_REGISTRATION.SELECTED')} : {selectedCount}
      </span>
      <Button
        type='primary'
        className={`w-full sm:w-auto sm:min-w-[66px] h-[44px] text-base md:text-lg border-none ${
          selectedCount === 0 ? 'cursor-not-allowed' : 'bg-[#fe7743]'
        }`}
        disabled={selectedCount === 0}
        onClick={onAction}
      >
        {t('INTERVIEW_REGISTRATION.SELECT')}
      </Button>
    </div>
  );
};

export default SelectedBar;
