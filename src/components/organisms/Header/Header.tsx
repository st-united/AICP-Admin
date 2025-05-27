import { useLocation } from 'react-router-dom';

import ProfileAvatar from './ProfileAvatar';

const Header = () => {
  const { pathname } = useLocation();

  const isHomePage = pathname === '/';

  return (
    <div
      className={`${
        isHomePage ? 'absolute bg-transparent' : 'bg-[#fff]'
      } flex justify-center item-center w-full z-9999 `}
    >
      <div className='container !md:px-0 !px-4'>
        <div className='flex items-center justify-end'>
          <div className='flex items-center gap-4 md:gap-6 py-2'>
            <ProfileAvatar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
