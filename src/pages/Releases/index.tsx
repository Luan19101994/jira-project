import React from 'react';
import { Panel } from 'rsuite';
import DataTable from './DataTable';

const Page = () => {
  return (
    <Panel
      header={
        <>
        <h5 className='mb-5 font-semibold'>RELEASE MANAGER</h5>
        </>
      }
    >
      <div className='relase'>
      <DataTable />

      </div>
    </Panel>
  );
};

export default Page;