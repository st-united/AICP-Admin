import { FILE_TYPE } from '@app/constants/file';

export interface ValidateFileParams {
  file: File;
  acceptedTypes: string[];
  maxSizeKB: number;
  type: FILE_TYPE;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessageKey?: string;
  errorMessageParams?: Record<string, any>;
}

export function validateFile({
  file,
  acceptedTypes,
  maxSizeKB,
  type,
}: ValidateFileParams): ValidationResult {
  if (!acceptedTypes.includes(file.type)) {
    return {
      isValid: false,
      errorMessageKey: 'VALIDATE.INVALID',
    };
  }
  if (file.size > maxSizeKB * 1024) {
    return {
      isValid: false,
      errorMessageKey: 'VALIDATE.FILE_MAX_SIZE',
      errorMessageParams: { max: maxSizeKB, type },
    };
  }
  return { isValid: true };
}
