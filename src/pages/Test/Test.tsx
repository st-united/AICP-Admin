import React from 'react';

import { TestList } from '@app/components/organisms/TestList';

const TestPage = () => {
  return (
    <div className='h-full overflow-auto'>
      <TestList />
    </div>
  );
};

export default TestPage;
