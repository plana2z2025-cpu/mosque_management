import React, { memo, useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { expenseActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Trash } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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

const numericOptions = {
  displayType: 'text',
  thousandSeparator: true,
  decimalScale: 2,
  fixedDecimalScale: true,
  // For RTL languages like Arabic
  // isRTL: ['ar-SA', 'ar-AE', 'ur-PK'].includes(country.locale)
};

const AllExpenses = () => {
  const { getAllExpensesAction } = expenseActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allExpenses, loading } = useSelector((state) => state?.expenseState);
  const [info, setInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!allExpenses || allExpenses?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getAllExpensesAction(query));
    }
  }, [info?.page]);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className="w-full flex justify-end">
        <Button variant="outline" onClick={() => navigate('create')}>
          Add New Expenses
        </Button>
      </div>
      <CustomTable1
        headers={headers}
        docs={allExpenses?.docs?.map((item) => ({
          ...item,
          category: item?.category?.name || '',
          date: moment(item?.date).format('LL'),
          amount: <NumericFormat value={item?.amount} prefix="$" {...numericOptions} />,
        }))}
        cardTitle="Expenses"
        totalPages={allExpenses?.totalPages}
        currentPage={allExpenses?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
        actions={(row) => <TableRow row={row} />}
        loading={loading}
      />
    </Mainwrapper>
  );
};

export default memo(AllExpenses);
