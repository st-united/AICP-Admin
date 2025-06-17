import { LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { DefaultAvatar } from '@app/assets/images';
import { useAppSelector } from '@app/redux/hooks';
import './ProfileAvatar.scss';

const ProfileAvatar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const items: MenuProps['items'] = isAuth
    ? [
        {
          key: '1',
          label: (
            <Link className='flex items-center gap-3 text-lg font-semibold !p-1' to={'/profile'}>
              <UserOutlined />
              <div>{t('PROFILE.PERSONAL_PROFILE')}</div>
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <div
              role='button'
              tabIndex={0}
              className='flex items-center gap-3 text-lg font-semibold !p-1 text-[#ED0909]'
              onClick={handleLogout}
              onKeyDown={handleLogout}
            >
              <LogoutOutlined />
              <div>{t('PROFILE.LOGOUT')}</div>
            </div>
          ),
        },
      ]
    : [
        {
          key: '3',
          label: (
            <Link className='flex items-center gap-3 text-lg font-semibold !p-1' to={'/login'}>
              <LoginOutlined />
              <div>{t('DROPDOWN_PROFILE.SIGN_IN')}</div>
            </Link>
          ),
        },
        {
          key: '4',
          label: (
            <Link className='flex items-center gap-3 text-lg font-semibold !p-1' to={'/register'}>
              <UserAddOutlined />
              <div>{t('DROPDOWN_PROFILE.SIGN_UP')}</div>
            </Link>
          ),
        },
      ];

  return (
    <Dropdown
      overlayClassName='dropdown-menu'
      menu={{ items }}
      placement='bottomRight'
      arrow
      className='h-full'
    >
      <Avatar
        className='border-[2px] !w-[40px] !h-[40px] md:!w-[50px] md:!h-[50px] cursor-pointer'
        src={isAuth && user?.avatarUrl ? user.avatarUrl : DefaultAvatar}
        icon={!isAuth || !user ? <UserOutlined /> : DefaultAvatar}
      />
    </Dropdown>
  );
};

export default ProfileAvatar;
