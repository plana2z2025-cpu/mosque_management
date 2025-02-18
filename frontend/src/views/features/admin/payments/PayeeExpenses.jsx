import React, { memo, useEffect, useState, useCallback } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { payeeActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Trash } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const breadCumbs = [{ label: 'Beneficiaries', href: '/admin/expenses/payees' }];

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

const PayeeExpenses = () => {
  const { getPayeeExpensesAction } = payeeActions;
  const dispatch = useDispatch();
  const { payeeId } = useParams();
  const { payeeExpenses, loading } = useSelector((state) => state?.payeeState);
  const [info, setInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!payeeExpenses || payeeExpenses?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getPayeeExpensesAction(payeeId, query));
    }
  }, [info?.page]);

  return (
    <Mainwrapper breadCumbs={[...breadCumbs, { label: payeeId, href: null }]}>
      <CustomTable1
        headers={headers}
        docs={payeeExpenses?.docs?.map((item) => ({
          ...item,
          category: item?.category?.name || '',
          date: moment(item?.date).format('LL'),
        }))}
        cardTitle="Beneficiary Expenses"
        totalPages={payeeExpenses?.totalPages}
        currentPage={payeeExpenses?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
        actions={(row) => <TableRow row={row} />}
        loading={loading}
      />
    </Mainwrapper>
  );
};

export default memo(PayeeExpenses);
