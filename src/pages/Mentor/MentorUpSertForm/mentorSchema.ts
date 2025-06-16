import { differenceInYears } from 'date-fns';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { NO_SPECIAL_CHARACTER_IN_NAME, NO_SPACE_START_END, NO_TWO_SPACE } from '@app/constants';

export const useMentorSchema = () => {
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
        t('VALIDATE.NO_SPACE_START_END', { field: t('PROFILE.FULLNAME') }) as string,
      )
      .matches(
        NO_TWO_SPACE,
        t('VALIDATE.NO_TWO_SPACE', { field: t('PROFILE.FULLNAME') }) as string,
      ),

    email: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PROFILE.EMAIL') }) as string)
      .email(t('VALIDATE.INVALID_EMAIL', { field: t('PROFILE.EMAIL') }) as string),

    phoneNumber: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PROFILE.PHONE') }) as string)
      .matches(/^[0-9]+$/, t('VALIDATE.NUMBER', { field: t('PROFILE.PHONE') }) as string)
      .min(10, t('VALIDATE.MIN_CHARACTER', { field: t('PROFILE.PHONE'), number: 10 }) as string)
      .max(11, t('VALIDATE.MAX_CHARACTER', { field: t('PROFILE.PHONE'), number: 11 }) as string),

    dob: yup
      .date()
      .nullable()
      .max(
        new Date(),
        t('VALIDATE.AFTER', {
          fieldFirst: t('PROFILE.DOB') as string,
          fieldSecond: t('PROFILE.CURRENT_DATE') as string,
        }) as string,
      )
      .test('is-18', t('VALIDATE.MIN_AGE', { age: 18 }) as string, function (value) {
        if (!value) return true; // nullable: true, không có giá trị thì bỏ qua
        return differenceInYears(new Date(), value) >= 18;
      }),
  });
};
