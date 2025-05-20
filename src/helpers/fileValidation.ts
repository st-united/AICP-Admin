export type FileType = 'image' | 'pdf' | 'word' | 'excel' | 'text' | 'video' | 'audio';
export interface ValidationResult {
  isValid: boolean;
  errorMessageKey?: string;
  errorMessageParams?: Record<string, any>;
}

export function validateFile(
  file: File,
  acceptedTypes: string[],
  maxSizeKB: number,
  type: FileType,
): ValidationResult {
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
