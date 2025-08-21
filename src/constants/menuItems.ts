import { LockOutlined, ProfileOutlined } from '@ant-design/icons';

export const menuItems = [
  {
    icon: ProfileOutlined,
    labelKey: 'SIDEBAR.PERSONAL_PROFILE',
    path: '/profile',
  },
  {
    icon: LockOutlined,
    labelKey: 'SIDEBAR.CHANGE_PASSWORD',
    path: '/change-password',
  },
];
