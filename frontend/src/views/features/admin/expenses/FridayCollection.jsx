import React, { memo, useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { expenseActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Trash } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

const breadCumbs = [{ label: 'Expenses', href: null }];

const headers = [
  { title: 'Offline Amount', key: 'offline_amount' },
  { title: 'Online Amount', key: 'online_amount' },
  { title: 'Date', key: 'date' },
];

const INITIAL_STATE = {
  limit: 10,
  page: 1,
  name: '',
};

const TableRow = memo(({ row, onDelete }) => (
  <Trash color="red" className="cursor-pointer size-5" />
));

const numericOptions = {
  displayType: 'text',
  thousandSeparator: true,
  decimalScale: 2,
  fixedDecimalScale: true,
  // For RTL languages like Arabic
  // isRTL: ['ar-SA', 'ar-AE', 'ur-PK'].includes(country.locale)
};

const allFridayCollections = () => {
  const { getAllFridayCollectionAction } = expenseActions;
  const dispatch = useDispatch();
  const { allFridayCollections, loading } = useSelector((state) => state?.expenseState);
  const [info, setInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!allFridayCollections || allFridayCollections?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getAllFridayCollectionAction(query));
    }
  }, [info?.page]);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <CustomTable1
        headers={headers}
        docs={allFridayCollections?.docs?.map((item) => ({
          ...item,
          category: item?.category?.name || '',
          date: moment(item?.date).format('LL'),
          online_amount: (
            <NumericFormat value={item?.online_amount} prefix="$" {...numericOptions} />
          ),
          offline_amount: (
            <NumericFormat value={item?.offline_amount} prefix="$" {...numericOptions} />
          ),
        }))}
        cardTitle="Friday Collection"
        totalPages={allFridayCollections?.totalPages}
        currentPage={allFridayCollections?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
        actions={(row) => <TableRow row={row} />}
        loading={loading}
      />
    </Mainwrapper>
  );
};

export default memo(allFridayCollections);
