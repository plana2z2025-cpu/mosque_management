import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { expenseActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { EXPENSE_CATEGORIES } from '@/redux/expenses/constant';
import { Trash, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ModalV1 from '@/views/components2/modal/ModalV1';

// Move constants outside component to prevent recreation
const INITIAL_STATE = {
  limit: 10,
  page: 1,
  name: '',
  isOpen: false,
  deleteId: null,
  deleteInput: '',
  deleteLoading: false,
};

const breadCumbs = [{ label: 'Categories', href: null }];

const headers = [
  // { title: 'ID', key: '_id' },
  { title: 'Name', key: 'name' },
  { title: 'Created By', key: 'createdBy' },
  { title: 'Updated By', key: 'updatedBy' },
  { title: 'Created At', key: 'createdAt' },
];

// Memoized row component
const TableRow = memo(({ row, onDelete }) => (
  <Trash color="red" className="cursor-pointer size-5" onClick={() => onDelete(row)} />
));

const ExpenseCategories = () => {
  const { getExpenseCategoriesAction, addNewExpenseCategoryAction, deleteExpenseCategoryAction } =
    expenseActions;
  const dispatch = useDispatch();

  // Optimize selectors to select only needed fields
  const expenseCategories = useSelector((state) => state.expenseState?.expenseCategories);
  const { profileDetails } = useSelector((state) => state?.userProfileState);

  const [info, setInfo] = useState(INITIAL_STATE);
  const [error, setError] = useState({});

  // Memoize transformed table data
  const tableData = useMemo(
    () =>
      expenseCategories?.docs?.map((item) => ({
        ...item,
        createdBy: item?.createdBy?.name,
        updatedBy: item?.updatedBy?.name,
        createdAt: moment(item.createdAt).format('DD/MM/yyyy'),
      })),
    [expenseCategories?.docs]
  );

  useEffect(() => {
    if (!expenseCategories || expenseCategories?.currentPage !== info?.page) {
      fetchExpensesCategories();
    }
  }, [info.page, expenseCategories?.currentPage]);

  const fetchExpensesCategories = () => {
    const query = `limit=${info?.limit}&page=${info?.page}`;
    dispatch(getExpenseCategoriesAction(query));
  };

  // Memoize validation rules
  const validateRules = useMemo(
    () => ({
      name: (value) =>
        value.trim() === ''
          ? 'Name is required'
          : expenseCategories?.docs?.find(
                (item) => item?.name?.toLowerCase() === value?.toLowerCase()
              )
            ? 'category with this name already exists'
            : null,
    }),
    [expenseCategories?.docs]
  );

  const validateField = useCallback(
    (key, value) => {
      return validateRules[key]?.(value) || null;
    },
    [validateRules]
  );

  const validateAllErrors = useCallback(() => {
    const newErrors = {};
    Object.keys(info).forEach((property) => {
      const error = validateField(property, info[property]);
      if (error) {
        newErrors[property] = error;
      }
    });
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [info, validateField]);

  const onOpenChange = useCallback(
    (open) => {
      setInfo((prev) => ({
        ...prev,
        isOpen: open,
        name: open ? prev.name : '',
      }));
      if (!open && Object.keys(error).length > 0) {
        setError({});
      }
    },
    [error]
  );

  const changeHandlerFunction = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInfo((prev) => ({ ...prev, [name]: value }));

      const newError = validateField(name, value);
      setError((prev) => ({
        ...prev,
        [name]: newError,
      }));
    },
    [validateField]
  );

  const changeInputDeleteHandlerFunction = useCallback(
    (e) => {
      setInfo((prev) => ({ ...prev, deleteInput: e?.target?.value || '' }));
    },
    [info?.deleteInput]
  );

  const submitNewCategoryHandler = useCallback(async () => {
    const havingErrors = validateAllErrors();
    if (!havingErrors) return;

    const json = { name: info?.name };

    const response = await addNewExpenseCategoryAction(json);
    if (response[0] === 201) {
      toast.success(response[1]?.message);
      const newResponse = {
        ...response[1].data,
        createdBy: {
          _id: profileDetails._id,
          name: profileDetails.name,
        },
      };

      dispatch({
        type: EXPENSE_CATEGORIES.success,
        payload: {
          ...expenseCategories,
          docs: [newResponse, ...expenseCategories.docs],
        },
      });

      setInfo((prev) => ({
        ...prev,
        name: '',
        isOpen: false,
      }));
    } else {
      toast.error(response[1].message);
    }
  }, [validateAllErrors, info.name, profileDetails._id]);

  const deletePopupModalFunc = useCallback((deleteId = null) => {
    setInfo((prev) => ({ ...prev, deleteId, deleteInput: '' }));
  }, []);

  const onPageChange = useCallback((page) => {
    setInfo((prev) => ({ ...prev, page }));
  }, []);

  const deleteCategorySubmitHandler = useCallback(async () => {
    if (!info?.deleteId?._id || info?.deleteLoading) return;
    const response = await deleteExpenseCategoryAction(info?.deleteId?._id);
    let updateState = {};
    if (response[0] === true) {
      let newResponse = { ...expenseCategories };
      newResponse.docs = newResponse.docs.filter((item) => item._id !== info?.deleteId?._id);

      dispatch({
        type: EXPENSE_CATEGORIES.success,
        payload: newResponse,
      });

      updateState = {
        deleteId: null,
        deleteInput: '',
        deleteLoading: false,
      };
    } else {
      updateState = {
        deleteInput: '',
        deleteLoading: false,
      };
      toast.error(response[1]?.message);
    }

    setInfo((prev) => ({ ...prev, ...updateState }));
  }, [info?.deleteId]);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <Dialog open={info?.isOpen} onOpenChange={onOpenChange}>
        <div className="w-full flex justify-end">
          <DialogTrigger asChild>
            <Button variant="outline">Add Expense Category</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Expense Category</DialogTitle>
            <DialogDescription>Add a new expense category name</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Category Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="categoryName"
                  placeholder={'Enter category name'}
                  value={info?.name}
                  name={'name'}
                  onChange={changeHandlerFunction}
                />
                {error?.name && <span className="text-red-600 text-[10px]">{error?.name}</span>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={submitNewCategoryHandler}>
              Save Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CustomTable1
        headers={headers}
        docs={tableData}
        cardTitle="Expenses"
        totalPages={expenseCategories?.totalPages}
        currentPage={expenseCategories?.currentPage}
        onPageChange={onPageChange}
        actions={(row) => <TableRow row={row} onDelete={deletePopupModalFunc} />}
      />

      <ModalV1
        isOpen={Boolean(info?.deleteId)}
        onClose={deletePopupModalFunc}
        title="Delete Category"
      >
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This action cannot be undone. Please type the category name to confirm.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="categoryName">
            Type "{info?.deleteId?.name || ''}" to confirm deletion:
          </Label>
          <Input
            id="categoryName"
            value={info?.deleteInput}
            onChange={changeInputDeleteHandlerFunction}
            placeholder="Enter category name"
            // className={error ? 'border-red-500' : ''}
          />
          {/* {error && (
            <p className="text-sm text-red-500">Category name doesn't match. Please try again.</p>
          )} */}
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <Button variant="outline" onClick={deletePopupModalFunc}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={deleteCategorySubmitHandler}
            disabled={info?.deleteInput !== info?.deleteId?.name || info?.deleteLoading}
          >
            Delete Category
          </Button>
        </div>
      </ModalV1>
    </Mainwrapper>
  );
};

export default memo(ExpenseCategories);
