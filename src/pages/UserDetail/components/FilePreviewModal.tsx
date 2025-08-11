import { Modal } from 'antd';
import React from 'react';

interface FilePreviewModalProps {
  open: boolean;
  fileUrl?: string;
  onClose: () => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ open, fileUrl, onClose }) => {
  const getFileType = (url: string) => {
    const ext = url.split('.').pop()?.toLowerCase();
    if (!ext) return 'unknown';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image';
    if (['pdf'].includes(ext)) return 'pdf';
    return 'other';
  };

  const fileType = fileUrl ? getFileType(fileUrl) : 'unknown';

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={800} title='Preview File'>
      {fileUrl ? (
        fileType === 'image' ? (
          <img src={fileUrl} alt='Preview' className='max-w-full max-h-[70vh] mx-auto' />
        ) : fileType === 'pdf' ? (
          <iframe src={fileUrl} title='PDF Preview' className='w-full' style={{ height: '70vh' }} />
        ) : (
          <p className='text-center text-gray-500'>Không hỗ trợ xem trước định dạng này.</p>
        )
      ) : (
        <p className='text-center text-gray-400'>Không có file để hiển thị.</p>
      )}
    </Modal>
  );
};

export default FilePreviewModal;
