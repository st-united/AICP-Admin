import { LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@app/redux/hooks';
import type { MenuProps } from 'antd';

import './ProfileAvatar.scss';

const ProfileAvatar = () => {
  const { t } = useTranslation();
  const { isAuth, user } = useAppSelector((state) => state.auth);

  const items: MenuProps['items'] = isAuth
    ? [
        {
          key: '1',
          label: (
            <div className='flex items-center gap-3 text-lg font-semibold !p-1 hover:!rounded-lg'>
              <UserOutlined />
              <div>{t('PROFILE.PERSONAL_PROFILE')}</div>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div className='flex items-center gap-3 text-lg font-semibold !p-1 text-[#ED0909]'>
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
    <Dropdown overlayClassName='dropdown-menu' menu={{ items }} placement='bottomRight' arrow>
      <Avatar
        className='border-[2px] !w-[40px] !h-[40px] md:!w-[50px] md:!h-[50px] cursor-pointer'
        src={isAuth && user ? user.avatarUrl : undefined}
        icon={!isAuth || !user ? <UserOutlined /> : undefined}
      />
    </Dropdown>
  );
};

export default ProfileAvatar;
