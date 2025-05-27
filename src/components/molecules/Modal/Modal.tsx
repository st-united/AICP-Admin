import { ModalProps } from 'antd';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export type TypeIcon = 'default' | 'caution' | 'warning' | 'success';

interface ModalCustomProps {
  title?: ReactNode;
  isOpen?: boolean;
  icon?: ReactNode
  type?: TypeIcon;
  children?: ReactNode;
  textCancel?: string;
  textSubmit?: string;
  handleCancel?: () => void;
  handleSubmit?: () => void;
}

export const Modal: FC<ModalCustomProps> = ({ ...props }) => {
  const { t } = useTranslation();

  const {
    isOpen = false,
    title,
    handleCancel,
    handleSubmit,
    type,
    icon,
    textCancel,
    textSubmit,
    children,
  } = props;

  const getIconColor = () => {
    switch (type) {
      case 'caution': return 'bg-[#FFA940]';
      case 'warning': return 'bg-[#FF4D4F]';
      case 'success': return 'bg-[#52C41A]';
      default: return 'bg-[#1890FF]';
    }
  };

  const [show, setShow] = useState(isOpen);
  const [animate, setAnimate] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else if (show) {
      setAnimate(false);
      timeoutRef.current = setTimeout(() => setShow(false), 200);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      onClick={handleCancel}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-200 ${animate ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white p-12 rounded-lg overflow-hidden w-[576px] transform transition-all duration-200 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className='text-center mb-6'>
          {icon && (
            <div className='flex justify-center items-center'>
              <div className={`h-[98px] w-[98px] flex justify-center items-center rounded-full ${getIconColor()} bg-opacity-10`}>
                <div className={`flex items-center justify-center w-20 h-20 rounded-full ${getIconColor()} bg-opacity-20`}>
                  {icon}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className='text-2xl text-center font-bold'>{title}</h1>
        </div>
        <div className='my-6'>
          {children}
        </div>
        <div className='flex justify-center gap-4 text-lg'>
          {
            handleCancel && (
              <button
                type="button"
                className='cursor-pointer h-[50px] px-12 font-medium text-[#686868] border-none rounded-full shadow-[0_0_8px_0px_rgb(212,212,212)] bg-white'
                onClick={handleCancel}
              >
                {textCancel ? textCancel : t<string>('BUTTON.CANCEL')}
              </button>
            )

          }
          {handleSubmit && (
            <button
              type="button"
              className='cursor-pointer h-[50px] px-16 font-medium bg-[#fe7743] border-none rounded-full text-white'
              onClick={handleSubmit}
            >
              {textSubmit ? textSubmit : t<string>('BUTTON.SAVE')}
            </button>
          )
          }

        </div>
      </div>
    </div>
  );
};
