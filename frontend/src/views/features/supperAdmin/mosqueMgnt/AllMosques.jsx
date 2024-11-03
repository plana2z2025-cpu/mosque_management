import React from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';

const breadCumbs = [
  { label: 'Mosques', href: null },
  // { label: 'Data Fetching', href: null },
];
const AllMosques = () => {
  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <h1>All Mosques</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </Mainwrapper>
  );
};

export default AllMosques;
