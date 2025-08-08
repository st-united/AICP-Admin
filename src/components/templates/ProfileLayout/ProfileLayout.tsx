import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@app/components/organisms/Sidebar/Sidebar';

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex justify-center w-full h-screen bg-[#fffbf9]'>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-black bg-opacity-50 z-40
          transition-opacity duration-300
          ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          md:hidden
        `}
        onClick={() => setIsSidebarOpen(false)}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => ['Enter', ' '].includes(e.key) && setIsSidebarOpen(false)}
        aria-label='Close sidebar'
      />

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-3/4 bg-white z-50
          transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden
        `}
      >
        <Sidebar />
      </div>

      <div className='flex flex-1 flex-row gap-4 p-4 w-full h-[95%]'>
        <div className='flex flex-col w-full h-full'>
          {!isSidebarOpen && (
            <div className='md:hidden z-50'>
              <Button
                type='text'
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className='!p-0'
              >
                <MenuOutlined className='text-2xl' />
              </Button>
            </div>
          )}

          <div className='flex flex-row gap-4 flex-1 h-full overflow-hidden'>
            {/* Sidebar */}
            <div className='hidden md:block top-0 left-0 z-40 w-1/5 py-2 h-full'>
              <Sidebar />
            </div>

            {/* Page content */}
            <div className='flex-1 h-full overflow-y-auto p-2'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
