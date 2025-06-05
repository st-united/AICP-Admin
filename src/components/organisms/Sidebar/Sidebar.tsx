import { ProfileOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      icon: ProfileOutlined,
      label: t('SIDEBAR.PERSONAL_PROFILE'),
      path: '/profile',
    },
    {
      icon: LockOutlined,
      label: t('SIDEBAR.CHANGE_PASSWORD'),
      path: '/change-password',
    },
  ];

  return (
    <div className='flex !rounded-2xl bg-white !p-6 min-h-[80vh] shadow-md'>
      <div className='grid grid-cols-1 gap-1 text-[16px] w-full h-fit'>
        {menuItems.map((item, index) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <Link to={item.path} key={index}>
              <div
                className={`flex flex-row gap-2 items-center justify-start !px-6 !p-4 hover:bg-[#fff2e8] rounded-lg cursor-pointer ${
                  isActive ? 'bg-[#fff2e8]' : ''
                }`}
              >
                <Icon style={{ fontSize: '24px', color: isActive ? '#ff7a45' : '#5B5B5B' }} />
                <div
                  className={`${
                    isActive ? 'text-[#ff7a45] font-semibold' : 'text-[#5B5B5B] font-medium'
                  }`}
                >
                  {item.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
