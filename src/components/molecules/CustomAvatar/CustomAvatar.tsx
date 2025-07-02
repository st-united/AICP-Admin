import { CameraFilled, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Upload, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ACCEPTED_IMAGE_TYPES, FILE_TYPE, MAX_IMAGE_FILE_SIZE_KB } from '@app/constants/file';
import { validateFile, ValidateFileParams } from '@app/helpers/fileValidation';
import {
  NotificationTypeEnum,
  openNotificationWithIcon,
} from '@app/services/notification/notificationService';

interface Props {
  avatar?: string;
  isEdit?: boolean;
  isUploading?: boolean;
  onAvatarChange: (formdata: FormData) => void;
}

const CustomAvartar = ({ avatar, isEdit, onAvatarChange, isUploading }: Props) => {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChangeImage = (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    if (!file) return;
    const paramValid: ValidateFileParams = {
      file,
      acceptedTypes: ACCEPTED_IMAGE_TYPES,
      maxSizeKB: MAX_IMAGE_FILE_SIZE_KB,
      type: FILE_TYPE.IMAGE,
    };
    const { isValid, errorMessageKey, errorMessageParams } = validateFile(paramValid);
    if (!isValid) {
      const msgKey = errorMessageKey ?? 'PROFILE.AVATAR_UPLOAD_ERROR';

      openNotificationWithIcon(
        NotificationTypeEnum.WARNING,
        t(msgKey, {
          field: t('PROFILE.AVATAR'),
          ...errorMessageParams,
        }),
      );
      setFileList([]);
      return;
    }
    const formdata = new FormData();
    formdata.append('avatar', file);
    onAvatarChange(formdata);
    setFileList([]);
  };
  return (
    <div className='relative'>
      {!isUploading ? (
        <Avatar
          className='relative md:!w-[180px] !w-[150px] md:!h-[180px] !h-[150px] !max-w-[900px]'
          src={avatar}
          icon={<UserOutlined className='md:!text-[150px] !text-[120px]' />}
        />
      ) : (
        <div className='relative md:!w-[180px] !w-[150px] md:!h-[180px] !h-[150px] !max-w-[900px] !text-black flex items-center justify-center'>
          <LoadingOutlined className='md:!text-[150px] !text-[100px]' />
        </div>
      )}
      {isEdit && (
        <Upload
          key={avatar}
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleChangeImage}
          accept='image/*'
          fileList={fileList}
        >
          <div className='absolute bottom-0 right-2 cursor-pointer'>
            <div className='flex items-center justify-center bg-[#FF8C5F] rounded-full !p-2'>
              <CameraFilled style={{ color: '#fff', fontSize: '24px' }} />
            </div>
          </div>
        </Upload>
      )}
    </div>
  );
};

export default CustomAvartar;
