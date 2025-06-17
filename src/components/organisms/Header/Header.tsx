import { Layout } from 'antd';

import ProfileAvatar from './ProfileAvatar';

const Header = () => {
  return (
    <Layout.Header className='flex items-center justify-end w-full !h-[5rem] px-6 bg-white shadow'>
      <ProfileAvatar />
    </Layout.Header>
  );
};

export default Header;
