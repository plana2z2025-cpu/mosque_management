import React, { memo, useEffect, useState, useCallback } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { expenseActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Trash, AlertCircle, Pencil } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { EXPENSES, SINGLE_EXPENSE } from '@/redux/expenses/constant';
import { all } from 'axios';

const breadCumbs = [{ label: 'Expenses', href: null }];

const headers = [
  { title: 'Type', key: 'category' },
  { title: 'Amount', key: 'amount' },
  { title: 'Status', key: 'status' },
  { title: 'Method', key: 'paymentMethod' },
  { title: 'PaymentDate', key: 'date' },
  { title: 'Paid To', key: 'payeeId' },
];

const INITIAL_STATE = {
  limit: 10,
  page: 1,
  name: '',
  isOpen: false,
  deleteId: null,
  deleteInput: '',
  deleteLoading: false,
};

const TableRow = memo(({ row, onDelete, onUpdate }) => (
  <>
    <Trash color="red" className="cursor-pointer size-5" onClick={() => onDelete(row._id)} />
    <Pencil color="black" className="cursor-pointer size-5" onClick={() => onUpdate(row)} />
  </>
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
  const { getAllExpensesAction, deleteExpenseAction } = expenseActions;
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

  const deletePopupModalFunc = useCallback((deleteId = null) => {
    setInfo((prev) => ({ ...prev, deleteId, deleteInput: '' }));
  }, []);

  const changeInputDeleteHandlerFunction = useCallback((e) => {
    setInfo((prev) => ({ ...prev, deleteInput: e?.target?.value || '' }));
  }, []);

  const deleteExpenseSubmitHandler = useCallback(async () => {
    if (!info?.deleteId || info?.deleteLoading) return;
    setInfo((prev) => ({ ...prev, deleteLoading: true }));

    const response = await deleteExpenseAction(info?.deleteId);
    if (response[0] === true) {
      toast.success('Event deleted successfully');
      setInfo((prev) => ({ ...prev, deleteId: null, deleteLoading: false }));
      if (allExpenses) {
        let updateData = { ...allExpenses };
        updateData.docs = updateData.docs.filter((item) => item._id !== info?.deleteId);
        dispatch({ type: EXPENSES.update, payload: updateData });
      }
    } else {
      toast.error(response[1]?.message || 'Failed to delete event');
      setInfo((prev) => ({ ...prev, deleteLoading: false }));
    }
  }, [info?.deleteId, info?.deleteLoading]);

  const editExpanseHandler = useCallback((row) => {
    const payload = allExpenses?.docs?.find((item) => item._id === row._id);
    dispatch({ type: SINGLE_EXPENSE.update, payload });
    navigate(`./edit/${row._id}`);
  }, []);

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
          payeeId: item?.payeeId?.payeeName || '',
        }))}
        cardTitle="Expenses"
        totalPages={allExpenses?.totalPages}
        currentPage={allExpenses?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
        actions={(row) => (
          <TableRow row={row} onDelete={deletePopupModalFunc} onUpdate={editExpanseHandler} />
        )}
        loading={loading}
      />

      <Dialog open={Boolean(info?.deleteId)} onOpenChange={() => deletePopupModalFunc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Expense</DialogTitle>
          </DialogHeader>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This action cannot be undone. Please type the "Delete" to confirm.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Input
              id="Event Title"
              value={info?.deleteInput}
              onChange={changeInputDeleteHandlerFunction}
              placeholder={`Type Delete to confirm`}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => deletePopupModalFunc(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteExpenseSubmitHandler}
              disabled={info?.deleteInput !== 'Delete' || info?.deleteLoading}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Mainwrapper>
  );
};

export default memo(AllExpenses);
