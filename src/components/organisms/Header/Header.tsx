import { Image } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import ProfileAvatar from './ProfileAvatar';
import { DevPlus, DevPlusS } from '@app/assets/images';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHomePage = pathname === '/';

  return (
    <div
      className={`${
        isHomePage ? 'absolute bg-transparent' : 'bg-[#080140]'
      } flex justify-center item-center w-full z-9999 `}
    >
      <div className='container !md:px-0 !px-4'>
        <div className='flex items-center justify-between'>
          <div className='cursor-pointer flex items-center justify-center'>
            <Image
              onClick={() => navigate('/')}
              src={DevPlus}
              className='hidden md:block !h-20'
              preview={false}
            />
            <Image
              onClick={() => navigate('/')}
              src={DevPlusS}
              className='block md:hidden !h-20'
              preview={false}
            />
          </div>
          <div className='flex items-center gap-4 md:gap-6'>
            <ProfileAvatar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
