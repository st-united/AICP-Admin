import { LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { MenuProps } from 'antd';

import './ProfileAvatar.scss';

const ProfileAvatar = () => {
  const { t } = useTranslation();
  console.log(localStorage.getItem('accessToken'));

  const isLoggedIn = !!localStorage.getItem('accessToken');

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className='profile-avatar__item'>
          <UserOutlined />
          <div>{t('PROFILE.PERSONAL_PROFILE')}</div>
        </div>
      ),
      style: { display: isLoggedIn ? 'block' : 'none' },
    },
    {
      key: '2',
      label: (
        <div className='profile-avatar__item profile-avatar__item--logout'>
          <LogoutOutlined />
          <div>{t('PROFILE.LOGOUT')}</div>
        </div>
      ),
      style: { display: isLoggedIn ? 'block' : 'none' },
    },
    {
      key: '3',
      label: (
        <Link to='/login' className='profile-avatar__item'>
          <LoginOutlined />
          <div>{t('DROPDOWN_PROFILE.SIGN_IN')}</div>
        </Link>
      ),
      style: { display: !isLoggedIn ? 'block' : 'none' },
    },
    {
      key: '4',
      label: (
        <Link to='/register' className='profile-avatar__item'>
          <UserAddOutlined />
          <div>{t('DROPDOWN_PROFILE.SIGN_UP')}</div>
        </Link>
      ),
      style: { display: !isLoggedIn ? 'block' : 'none' },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement='bottomRight'
      arrow
      overlayClassName='profile-avatar__dropdown'
    >
      <Avatar
        className='profile-avatar__avatar'
        icon={
          <div className='flex items-center justify-center w-full h-full'>
            <UserOutlined />
          </div>
        }
      />
    </Dropdown>
  );
};

export default ProfileAvatar;
