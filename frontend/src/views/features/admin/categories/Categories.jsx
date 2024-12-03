import React, { memo } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { administratorActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomTable1 from '@/views/components2/tables/CustomTable1';

const breadCumbs = [{ label: 'Categories', href: null }];

const headers = [
  { title: 'ID', key: '_id' },
  { title: 'Name', key: 'name' },
  { title: 'Created On', key: 'createdAt' },
];
const Categories = () => {
  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <CustomTable1
        headers={headers}
        docs={administrators?.map((item) => ({
          ...item,
          createdAt: moment(item.createdAt).format('DD/MM/yyyy'),
        }))}
        cardTitle="Categories"
      />
    </Mainwrapper>
  );
};

export default memo(Categories);
