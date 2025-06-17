import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { logoDevPlus } from '@app/assets/images';

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const handleOnClickHomePage = () => {
    navigate('/');
  };
  return (
    <div className='relative h-screen w-full grid !p-10 bg-cover bg-center bg-no-repeat bg-[url(./assets/images/login-background.png)]'>
      <div className='absolute top-[4rem] left-[7rem] flex'>
        <button
          onClick={handleOnClickHomePage}
          className='flex justify-center items-center cursor-pointer bg-transparent border-none outline-none'
        >
          <img src={logoDevPlus} alt='Logo' />
        </button>
      </div>
      <div className='flex justify-center items-center'>
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
