import { Layout } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

import ProfileAvatar from './ProfileAvatar';
import { logoDevPlus } from '@app/assets/images';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Layout.Header className='flex items-center justify-between w-full !h-[5rem] px-6 bg-white shadow'>
      <Link className='flex items-center gap-4 cursor-pointer' to='/'>
        <img src={logoDevPlus} alt='logo' className='w-[8rem]' />
      </Link>
      <ProfileAvatar />
    </Layout.Header>
  );
};

export default Header;
