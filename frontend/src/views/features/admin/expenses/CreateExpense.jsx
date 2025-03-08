import React, { useState, useEffect } from 'react';
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
import { cn } from '@/lib/utils';
// import { format } from 'date-fns';
import { CalendarIcon, Trash2, Plus, CookingPot } from 'lucide-react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useSelector, useDispatch } from 'react-redux';
import { expenseActions } from '@/redux/combineActions';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

const breadCumbs = [
  { label: 'Expenses', href: '/admin/expenses' },
  { label: 'Create Expense', href: null },
];
const targetAudienceOptions = [
  { label: 'men', value: 'men' },
  { label: 'women', value: 'women' },
  { label: 'children', value: 'children' },
  { label: 'youth', value: 'youth' },
  { label: 'seniors', value: 'seniors' },
  { label: 'families', value: 'families' },
  { label: 'converts', value: 'converts' },
  { label: 'all', value: 'all' },
];

export function CreateExpensesForm() {
  // State to manage form data and errors
  const dispatch = useDispatch();
  const { expenseCategoryNames } = useSelector((state) => state.expenseState);
  const { addNewExpenseAction, getAllExpenseCategoryNamesAction } = expenseActions;

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    type: '',
    date: new Date(),
    paymentMethod: 'cash',
    category: '',
    receiptImage: 'testing.jpg',
  });

  // State to manage form errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!expenseCategoryNames) {
      fetchAllCategoriesNames();
    }
  }, [expenseCategoryNames]);

  const fetchAllCategoriesNames = () => {
    dispatch(getAllExpenseCategoryNamesAction());
  };

  // Validate form fields
  const validateFieldFunc = (key, value) => {
    const validateRules = {
      title: () =>
        value.trim() === ''
          ? 'Title is required'
          : value?.title?.length
            ? 'Title must be max characters'
            : null,
      description: () => (value.trim() === '' ? 'Description is required' : null),
      type: () => (value.trim() === '' ? 'Event Type is required' : null),
      location: () => (value.trim() === '' ? 'Location is required' : null),
      tagTitle: () => (value.trim() === '' ? 'tag is required' : null),
    };

    const validateNow = validateRules?.[key] ? validateRules[key]() : null;
    return validateNow ? validateNow : null;
  };

  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

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

  const handleTypeEventChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
    let newError = validateFieldFunc('type', value);
    setErrors((prev) => ({
      ...prev,
      type: newError,
    }));
  };

  // Handle Date change
  const changeDateHandler = (date, name) => {
    let options = {
      date,
    };
    setFormData((prev) => ({
      ...prev,
      ...options,
    }));
  };

  const validateFormFunction = () => {
    let newErrors = {};
    let updateFormData = {};

    Object.keys(formData).forEach((key) => {
      let error = null;

      error = validateFieldFunc(key, formData[key]);

      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormFunction()) {
      const json = {
        ...formData,
      };

      json.startDate = moment(json.startDate).utc().format();
      json.endDate = moment(json.endDate).utc().format();
      json.time = moment(json.time).utc().format();

      // const response = await addNewEventAction(json);
      // if (response[0] === 201) {
      //   toast.success('event is created successfully');
      // } else {
      //   toast.error(response[1]?.message);
      // }
    }
  };

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <form onSubmit={handleSubmit} className="space-y-8 w-1/2 max-md:w-full m-auto">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Expense Amount</label>
          <Input
            name="amount"
            type="number"
            value={formData.amount}
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
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of the event"
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Expenses Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Expense Type</label>
          <Select name="type" value={formData.type} onValueChange={handleTypeEventChange}>
            <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {expenseCategoryNames &&
                expenseCategoryNames?.map((singleCategory) => (
                  <SelectItem value={singleCategory?._id}>{singleCategory?.name}</SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
        </div>

        {/* Event Date Input */}

        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <Calendar
            mode="single"
            name="startDate"
            selected={formData.startDate}
            onSelect={(date) => changeDateHandler(date, 'startDate')}
            disabled={(date) => date < new Date()}
            // initialFocus
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Create Expense
        </Button>
      </form>
    </Mainwrapper>
  );
}

export default CreateExpensesForm;
