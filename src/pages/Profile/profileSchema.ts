import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import {
  PHONE_REGEX_PATTERN,
  NO_SPECIAL_CHARACTER_IN_NAME,
  NO_SPACE_START_END,
  NO_TWO_SPACE,
} from '@app/constants/regex';

export const useProfileSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    fullName: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PROFILE.FULLNAME') }) as string)
      .matches(
        NO_SPECIAL_CHARACTER_IN_NAME,
        t('VALIDATE.ONLY_ALPHABET', { field: t('PROFILE.FULLNAME') }) as string,
      )
      .matches(
        NO_SPACE_START_END,
        t('VALIDATE.NOT_ALLOW_SPACE_START_END', { field: t('PROFILE.FULLNAME') }) as string,
      )
      .matches(
        NO_TWO_SPACE,
        t('VALIDATE.NOT_ALLOW_TWO_SPACE', { field: t('PROFILE.FULLNAME') }) as string,
      ),

    phoneNumber: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PROFILE.PHONE') }) as string)
      .matches(PHONE_REGEX_PATTERN, t('VALIDATE.INVALID', { field: t('PROFILE.PHONE') }) as string),

    dob: yup
      .date()
      .nullable()
      .min(
        new Date('1900-01-01'),
        t('VALIDATE.DATE_OF_BIRTH_MIN', { field: t('PROFILE.DOB') }) as string,
      )
      .max(new Date(), t('VALIDATE.DATE_OF_BIRTH_MAX', { field: t('PROFILE.DOB') }) as string),
  });
};
