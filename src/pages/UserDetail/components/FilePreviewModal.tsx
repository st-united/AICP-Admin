import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { FILE_TYPE } from '@app/constants/file';
import { getFileType } from '@app/utils';

interface FilePreviewModalProps {
  open: boolean;
  fileUrl?: string;
  onClose: () => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ open, fileUrl, onClose }) => {
  const { t } = useTranslation();
  const fileType = fileUrl ? getFileType(fileUrl) : 'unknown';

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={800} title='Preview File'>
      {fileUrl ? (
        fileType === FILE_TYPE.IMAGE ? (
          <img src={fileUrl} alt='Preview' className='max-w-full max-h-[70vh] mx-auto' />
        ) : fileType === FILE_TYPE.PDF ? (
          <iframe src={fileUrl} title='PDF Preview' className='w-full' style={{ height: '70vh' }} />
        ) : (
          <p className='text-center text-gray-500'>{t('FILE_PREVIEW.FORMAT_ERROR')}</p>
        )
      ) : (
        <p className='text-center text-gray-400'>{t('FILE_PREVIEW.NO_DATA')}</p>
      )}
    </Modal>
  );
};

export default FilePreviewModal;
