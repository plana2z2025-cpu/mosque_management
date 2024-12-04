import React, { memo, useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { categoryActions } from '@/redux/combineActions';
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
import { EVENT_CATEGORIES } from '@/redux/categories/constant';

const breadCumbs = [{ label: 'Categories', href: null }];

const headers = [
  { title: 'ID', key: '_id' },
  { title: 'Name', key: 'name' },
  { title: 'Created By', key: 'createdBy' },
  { title: 'Updated By', key: 'updatedBy' },
  { title: 'Created At', key: 'createdAt' },
];
const Categories = () => {
  const { getEventCategoriesAction, addNewEventCategoryAction } = categoryActions;
  const dispatch = useDispatch();
  const { eventCategories } = useSelector((state) => state.eventCategoryState);
  const { profileDetails } = useSelector((state) => state.userProfileState);
  const [info, setInfo] = useState({
    limit: 10,
    page: 1,
    name: '',
    isOpen: false,
  });

  const [error, setError] = useState({});

  useEffect(() => {
    if (!eventCategories || eventCategories?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getEventCategoriesAction(query));
    }
  }, [info?.page]);

  const validateField = (key, value) => {
    const validateRules = {
      name: () =>
        value.trim() === ''
          ? 'Name is required'
          : eventCategories?.docs?.find(
                (item) => item?.name?.toLowerCase() === value?.toLowerCase()
              )
            ? 'category with this name already exists'
            : null,
    };

    const validateNow = validateRules?.[key]?.() || null;
    return validateNow ? validateNow : null;
  };

  const validateAllErrors = () => {
    let newErrors = {};

    Object.keys(info).forEach((property) => {
      const error = validateField(property, info?.[property]);
      if (error) {
        newErrors[property] = error;
      }
    });

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onOpenChange = (open) => {
    const options = { isOpen: open };

    if (!open) {
      if (Object.keys(error).length > 0) setError({});
      options.name = '';
      options.password = '';
    }
    setInfo((prev) => ({ ...prev, ...options }));
  };

  const changeHandlerFunction = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));

    let newError = validateField(name, value);
    setError((prev) => ({
      ...prev,
      [name]: newError,
    }));
  };

  const submitNewCategoryHandler = async () => {
    const havingErrors = validateAllErrors();
    if (!havingErrors) return;

    const json = {
      name: info?.name,
    };

    const response = await addNewEventCategoryAction(json);
    if (response[0] === 201) {
      toast.success(response[1]?.message);
      const newResponse = {
        ...response[1].data,
        createdBy: {
          _id: profileDetails?._id,
          name: profileDetails?.name,
        },
      };

      dispatch({
        type: EVENT_CATEGORIES.success,
        payload: {
          ...eventCategories,
          docs: [newResponse, ...eventCategories.docs],
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
  };

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <Dialog open={info?.isOpen} onOpenChange={onOpenChange}>
        <div className="w-full flex justify-end">
          <DialogTrigger asChild>
            <Button variant="outline">Add Event Category</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Event Category</DialogTitle>
            <DialogDescription>Add a new event category name</DialogDescription>
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
        docs={eventCategories?.docs?.map((item) => ({
          ...item,
          createdBy: item?.createdBy?.name,
          updatedBy: item?.updatedBy?.name,
          createdAt: moment(item.createdAt).format('DD/MM/yyyy'),
        }))}
        cardTitle="Categories"
        totalPages={eventCategories?.totalPages}
        currentPage={eventCategories?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
      />
    </Mainwrapper>
  );
};

export default memo(Categories);
