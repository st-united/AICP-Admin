import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const useMentorSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    fullName: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('PROFILE.FULLNAME') }) as string)
      .min(2, t('VALIDATE.MIN_CHARACTER', { field: t('PROFILE.FULLNAME'), number: 2 }) as string)
      .matches(
        /^[^0-9]*$/,
        t('VALIDATE.NOT_ALLOW_NUMBER', { field: t('PROFILE.FULLNAME') }) as string,
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
          fieldFirst: t('PROFILE.DOB'),
          fieldSecond: 'ngày hiện tại',
        }) as string,
      ),
  });
};
