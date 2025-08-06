interface ModalContentProps {
  message: string;
}

export const ContentModal = ({ message }: ModalContentProps) => {
  return (
    <div className='px-2 space-y-2 md:px-6 md:space-y-3'>
      <p className='text-base text-center text-gray-900 md:text-lg !leading-9'>{message}</p>
    </div>
  );
};
