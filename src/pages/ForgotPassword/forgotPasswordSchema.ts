import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { EMAIL_REGEX_PATTERN } from '@app/constants/regex';

export const useForgotPasswordSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    email: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('USER.EMAIL') }) as string)
      .matches(EMAIL_REGEX_PATTERN, t('VALIDATE.INVALID', { field: t('USER.EMAIL') }) as string),
  });
};
