import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { PASSWORD_REGEX_PATTERN } from '@app/constants/regex';

export const useChangePasswordSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    oldPassword: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PASSWORD.PASSWORD') }) as string),

    newPassword: yup
      .string()
      .matches(
        PASSWORD_REGEX_PATTERN,
        t('VALIDATE.RULE_PASSWORD', { field: t('PASSWORD.PASSWORD') }) as string,
      )
      .required(t('VALIDATE.REQUIRED', { field: t('PASSWORD.PASSWORD') }) as string),

    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password')],
        t('VALIDATE.MATCH', { field: t('PASSWORD.PASSWORD') }) as string,
      )
      .required(t('VALIDATE.REQUIRED', { field: t('PASSWORD.PASSWORD') }) as string),
  });
};
