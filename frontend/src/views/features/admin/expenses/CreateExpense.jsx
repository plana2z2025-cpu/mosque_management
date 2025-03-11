import React, { useState, useEffect, useCallback } from 'react';
import validator from 'validator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useSelector, useDispatch } from 'react-redux';
import { expenseActions, payeeActions } from '@/redux/combineActions';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { set } from 'date-fns';

const breadCumbs = [
  { label: 'Expenses', href: '/admin/expenses' },
  { label: 'Create Expense', href: null },
];

const INITIAL_STATE = {
  amount: '',
  description: '',
  date: new Date(),
  paymentMethod: 'cash',
  category: '',
  receiptImage: 'https://example.com/receipt.jpg',
  status: 'pending',
  payeeId: null,
};

const paymentMethodsList = [
  { name: 'Cash', value: 'cash' },
  { name: 'UPI', value: 'UPI' },
  { name: 'Card', value: 'card' },
  { name: 'Check', value: 'check' },
  { name: 'Other', value: 'other' },
];

const statusList = [
  { name: 'Paid', value: 'paid' },
  { name: 'Pending', value: 'pending' },
];
export function CreateExpensesForm() {
  // State to manage form data and errors
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { expenseCategoryNames, singleExpenseDetails } = useSelector((state) => state.expenseState);
  const { payeeNamesList } = useSelector((state) => state.payeeState);
  const {
    addNewExpenseAction,
    getAllExpenseCategoryNamesAction,
    getSingleExpensesAction,
    updateExpenseAction,
  } = expenseActions;
  const { getAllPayeeNamesAction } = payeeActions;

  const [formData, setFormData] = useState({ ...INITIAL_STATE });

  // State to manage form errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!expenseCategoryNames) {
      fetchAllCategoriesNames();
    }
  }, [expenseCategoryNames]);
  useEffect(() => {
    if (!payeeNamesList) {
      fetchAllPayeesNames();
    }
  }, [payeeNamesList]);

  useEffect(() => {
    if (expenseId && singleExpenseDetails?._id !== expenseId) {
      dispatch(getSingleExpensesAction(expenseId));
    } else if (expenseId && singleExpenseDetails) {
      setFormData({
        amount: String(singleExpenseDetails?.amount),
        description: singleExpenseDetails?.description,
        date: new Date(singleExpenseDetails?.date),
        paymentMethod: singleExpenseDetails?.paymentMethod,
        category: singleExpenseDetails?.category?._id || '',
        receiptImage: singleExpenseDetails?.receiptImage,
        status: singleExpenseDetails?.status,
        payeeId: singleExpenseDetails?.payeeId?._id ?? null,
      });
    }
  }, [expenseId, singleExpenseDetails]);

  const fetchAllCategoriesNames = useCallback(() => {
    dispatch(getAllExpenseCategoryNamesAction());
  }, []);

  const fetchAllPayeesNames = useCallback(() => {
    dispatch(getAllPayeeNamesAction());
  }, []);

  // Validate form fields
  const validateFieldFunc = (key, value) => {
    const validateRules = {
      amount: () =>
        value.trim() === ''
          ? 'Amount is required'
          : !validator.isNumeric(value)
            ? 'Amount must be a number'
            : null,
      description: () => (value.trim() === '' ? 'Description is required' : null),
      category: () => (value.trim() === '' ? 'Expense Type is required' : null),
      paymentMethod: () => (value.trim() === '' ? 'Payment Method is required' : null),
    };

    const validateNow = validateRules?.[key] ? validateRules[key]() : null;
    return validateNow ? validateNow : null;
  };

  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let newError = validateFieldFunc([name], value);
    setErrors((prev) => ({
      ...prev,
      [name]: newError,
    }));
  };

  const handleSelectChangeHandler = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    let newError = validateFieldFunc(key, value);
    setErrors((prev) => ({
      ...prev,
      [key]: newError,
    }));
  };

  // Handle Date change
  const changeDateHandler = (date, name) => {
    let options = {
      [name]: date,
    };
    setFormData((prev) => ({
      ...prev,
      ...options,
    }));
  };

  const validateFormFunction = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      let error = null;

      error = validateFieldFunc(key, formData[key]);

      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateFormFunction()) {
        const json = {
          ...formData,
        };

        json.date = moment(json.date).utc().format();
        json.amount = parseFloat(json.amount);
        if (json.payeeId) {
          json.payeeId = json.payeeId;
        } else {
          delete json.payeeId;
        }

        const response = await addNewExpenseAction(json);
        if (response[2] === 201) {
          toast.success('Expense is created successfully');
          setFormData({ ...INITIAL_STATE });
          setErrors({});
        } else {
          toast.error(response[1]?.message);
        }
      }
    },
    [formData]
  );

  const handleUpdateForm = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateFormFunction()) {
        const json = {
          ...formData,
        };

        // json.date = moment(json.date).utc().format();
        delete json.date;
        json.amount = parseFloat(json.amount);
        if (json.payeeId) {
          json.payeeId = json.payeeId;
        } else {
          delete json.payeeId;
        }

        const response = await updateExpenseAction(expenseId, json);
        console.log(response);
        if (response[2] === 200) {
          toast.success('Expenses is updated successfully');
          setFormData({ ...INITIAL_STATE });
          setErrors({});
          navigate('/admin/expenses');
        } else {
          toast.error(response[1]?.message);
        }
      }
    },
    [formData]
  );

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <form
        onSubmit={expenseId ? handleUpdateForm : handleSubmit}
        className="space-y-8 w-1/2 max-md:w-full m-auto"
      >
        {/* Title Input  */}
        <div>
          <label className="block text-sm font-medium mb-2">Expense Amount</label>
          <Input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            value={formData?.amount}
            onChange={handleChange}
            placeholder="Enter expense amount"
            className={errors?.amount ? 'border-red-500' : ''}
          />
          {errors?.amount && <p className="text-red-500 text-xs mt-1">{errors?.amount}</p>}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            name="description"
            value={formData?.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of the event"
            className={errors?.description ? 'border-red-500' : ''}
          />
          {errors?.description && (
            <p className="text-red-500 text-xs mt-1">{errors?.description}</p>
          )}
        </div>

        {/* Expenses Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Expense Type</label>
          <Select
            name="category"
            value={formData?.category}
            onValueChange={(value) => handleSelectChangeHandler(value, 'category')}
          >
            <SelectTrigger className={errors?.category ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {expenseCategoryNames &&
                expenseCategoryNames?.map((singleCategory) => (
                  <SelectItem value={singleCategory?._id}>{singleCategory?.name}</SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors?.category && <p className="text-red-500 text-xs mt-1">{errors?.category}</p>}
        </div>

        {/* Payee Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Payer Name</label>
          <Select
            name="payeeId"
            value={formData?.payeeId || ''}
            onValueChange={(value) => handleSelectChangeHandler(value, 'payeeId')}
          >
            <SelectTrigger className={errors?.payeeId ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select Payee Name" />
            </SelectTrigger>
            <SelectContent>
              {payeeNamesList &&
                payeeNamesList?.map((singlePayee) => (
                  <SelectItem value={singlePayee?._id}>{singlePayee?.payeeName}</SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors?.payeeId && <p className="text-red-500 text-xs mt-1">{errors?.payeeId}</p>}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <Select
            name="paymentMethod"
            value={formData?.paymentMethod}
            onValueChange={(value) => handleSelectChangeHandler(value, 'paymentMethod')}
          >
            <SelectTrigger className={errors?.paymentMethod ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethodsList?.map((singleMethod) => (
                <SelectItem value={singleMethod?.value} key={singleMethod?.value}>
                  {singleMethod?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.paymentMethod && (
            <p className="text-red-500 text-xs mt-1">{errors?.paymentMethod}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <Select
            name="status"
            value={formData?.status}
            onValueChange={(value) => handleSelectChangeHandler(value, 'status')}
          >
            <SelectTrigger className={errors?.status ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {statusList?.map((singleStatus) => (
                <SelectItem value={singleStatus?.value}>{singleStatus?.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.status && <p className="text-red-500 text-xs mt-1">{errors?.status}</p>}
        </div>

        {/* Expense Date Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <Calendar
            mode="single"
            name="date"
            selected={formData?.date}
            onSelect={(date) => changeDateHandler(date, 'date')}
            disabled={expenseId ? true : false}
            // initialFocus
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {expenseId ? 'Update Expense' : 'Create Expense'}
        </Button>
      </form>
    </Mainwrapper>
  );
}

export default CreateExpensesForm;
