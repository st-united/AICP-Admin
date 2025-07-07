import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

import ProfileAvatar from './ProfileAvatar';
import { logoDevPlus } from '@app/assets/images';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Layout.Header className='flex items-center justify-between w-full !h-[5rem] px-6 bg-white shadow'>
      <div
        className='flex items-center gap-4 cursor-pointer'
        onClick={() => navigate('/')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate('/');
        }}
        role='button'
        tabIndex={0}
        aria-label='Go to home'
      >
        <img src={logoDevPlus} alt='logo' className='w-[8rem]' />
      </div>
      <ProfileAvatar />
    </Layout.Header>
  );
};

export default Header;
