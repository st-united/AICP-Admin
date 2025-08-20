import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

interface TruncateTextProps {
  value?: string;
}

export const TruncateText = ({ value }: TruncateTextProps) => {
  const { t } = useTranslation();
  const safeValue = value?.trim() || t('TABLE.EMPTY');

  return (
    <Tooltip title={safeValue}>
      <p className='text-[1rem] font-semibold truncate max-w-[9.375rem] sm:max-w-[15.625rem]'>
        {safeValue}
      </p>
    </Tooltip>
  );
};

export default TruncateText;
