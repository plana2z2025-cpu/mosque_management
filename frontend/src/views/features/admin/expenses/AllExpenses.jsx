import React, { memo, useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { expenseActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Trash } from 'lucide-react';

const breadCumbs = [{ label: 'Expenses', href: null }];

const headers = [
  { title: 'Type', key: 'category' },
  { title: 'Amount', key: 'amount' },
  { title: 'Status', key: 'status' },
  { title: 'Method', key: 'paymentMethod' },
  { title: 'PaymentDate', key: 'date' },
];

const INITIAL_STATE = {
  limit: 10,
  page: 1,
  name: '',
  isOpen: false,
};

const TableRow = memo(({ row, onDelete }) => (
  <Trash color="red" className="cursor-pointer size-5" />
));

const AllExpenses = () => {
  const { getAllExpensesAction } = expenseActions;
  const dispatch = useDispatch();
  const { allExpenses } = useSelector((state) => state?.expenseState);
  const [info, setInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!allExpenses || allExpenses?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getAllExpensesAction(query));
    }
  }, [info?.page]);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <CustomTable1
        headers={headers}
        docs={allExpenses?.docs?.map((item) => ({
          ...item,
          category: item?.category?.name || '',
          date: moment(item?.date).format('LL'),
        }))}
        cardTitle="Expenses"
        totalPages={allExpenses?.totalPages}
        currentPage={allExpenses?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
        actions={(row) => <TableRow row={row} />}
      />
    </Mainwrapper>
  );
};

export default memo(AllExpenses);
