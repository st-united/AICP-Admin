import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@app/components/organisms/Sidebar/Sidebar';

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex h-full w-full bg-[#fffbf9]'>
      <button
        type='button'
        aria-label='Close sidebar overlay'
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } md:hidden`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`
          fixed top-0 left-0 h-full w-3/5 max-w-xs bg-white z-50
          transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden
        `}
      >
        <Sidebar />
      </div>

      <aside
        className='
          hidden md:block shrink-0 border-r border-gray-200 p-4
          md:w-64 lg:w-72 xl:w-80
        '
      >
        <Sidebar />
      </aside>

      <main className='flex-1 flex flex-col overflow-hidden'>
        <div className='md:hidden px-4 border-b border-gray-200'>
          <Button type='text' onClick={() => setIsSidebarOpen((prev) => !prev)} className='!p-0'>
            <MenuOutlined className='text-2xl' />
          </Button>
        </div>

        <div className='flex-1 overflow-auto p-4'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
