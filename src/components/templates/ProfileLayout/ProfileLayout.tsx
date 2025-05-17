import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@app/components/organisms/Sidebar/Sidebar';

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='relative flex justify-center items-center w-full min-h-[80vh] bg-[#f3f8fa]'>
      <div
        className={`
          fixed inset-0 bg-black bg-opacity-50 z-40
          transition-opacity duration-300
          ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          md:hidden
        `}
        onClick={() => setIsSidebarOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsSidebarOpen(false);
          }
        }}
        aria-label='Close sidebar'
        role='button'
        tabIndex={0}
      />
      <div
        className={`
          fixed top-0 left-0 h-full w-1/2 bg-white z-50
          transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden
        `}
      >
        <Sidebar />
      </div>

      <div className='container flex mx-auto flex-row gap-4 p-4 w-full'>
        {!isSidebarOpen && (
          <div className='md:hidden z-50'>
            <Button type='text' onClick={() => setIsSidebarOpen((prev) => !prev)} className='!p-0'>
              <MenuOutlined className='text-2xl' />
            </Button>
          </div>
        )}

        <div className='hidden md:block top-0 left-0 min-h-[80vh] z-40 w-1/5'>
          <Sidebar />
        </div>

        <div className='md:col-span-4 lg:col-span-3 xl:col-span-4 2xl:col-span-4 h-full w-3/4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
