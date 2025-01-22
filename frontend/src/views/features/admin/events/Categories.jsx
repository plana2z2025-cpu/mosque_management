import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { eventActions } from '@/redux/combineActions';
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
import { EVENT_CATEGORIES, UPDATE_CATEGORY } from '@/redux/events/constant';
import { Trash, AlertCircle, Pencil } from 'lucide-react';
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
  { title: 'ID', key: '_id' },
  { title: 'Name', key: 'name' },
  { title: 'Created By', key: 'createdBy' },
  { title: 'Updated By', key: 'updatedBy' },
  { title: 'Created At', key: 'createdAt' },
];

// Memoized row component
const TableRow = memo(({ row, onDelete, onUpdate }) => (
  <>
    <Trash color="red" className="cursor-pointer size-5" onClick={() => onDelete(row)} />
    <Pencil color="black" className="cursor-pointer size-5" onClick={() => onUpdate(row)} />
  </>
));

const Categories = () => {
  const { getEventCategoriesAction, addNewEventCategoryAction, deleteCategoryAction, updateEventCategoryAction, } =
    eventActions;
  const dispatch = useDispatch();

  // Optimize selectors to select only needed fields
  const eventCategories = useSelector((state) => state.eventState.eventCategories);
  const profileDetails = useSelector((state) => state?.userProfileState);

  const [info, setInfo] = useState(INITIAL_STATE);
  const [error, setError] = useState({});

  // Memoize transformed table data
  const tableData = useMemo(
    () =>
      eventCategories?.docs?.map((item) => ({
        ...item,
        createdBy: item?.createdBy?.name,
        updatedBy: item?.updatedBy?.name,
        createdAt: item.createdAt
          ? moment(item.createdAt).format('DD/MM/yyyy')
          : 'N/A',
      })),
    [eventCategories?.docs]
  );

  // Memoize validation rules
  const validateRules = useMemo(
    () => ({
      name: (value) =>
        value.trim() === ''
          ? 'Name is required'
          : eventCategories?.docs?.find(
            (item) => item?.name?.toLowerCase() === value?.toLowerCase()
          )
            ? 'category with this name already exists'
            : null,
    }),
    [eventCategories?.docs]
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

  useEffect(() => {
    if (!eventCategories || eventCategories?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getEventCategoriesAction(query));
    }
  }, [info.page, eventCategories?.currentPage, dispatch, getEventCategoriesAction, info.limit]);

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

    const json = { ...info?.row, createdBy: info?.row?.createdBy?._id, name: info?.name };
    let response;

    try {
      if (info?.editId) {
        response = await updateEventCategoryAction(info?.editId, json);
        if (response[2] === 200) {
          toast.success("Event Category Updated Successfully");
          const updatedCategory = response[1]?.data;
          const updatedEventCategories = {
            ...eventCategories,
            docs: eventCategories.docs.map((category) =>
              category._id === updatedCategory._id ? updatedCategory : category
            ),
          };
          dispatch({
            type: UPDATE_CATEGORY.success,
            payload: updatedEventCategories,
          });

          setInfo((prev) => ({
            ...prev,
            name: '',
            editId: null,
            isOpen: false,
          }));
        } else {
          toast.error(response[1]?.message);
        }
      } else {
        delete json._id;
        delete json.mosqueId;
        delete json.createdBy;
        delete json.createdRef;
        delete json.createdAt;
        delete json.updatedAt;
        delete json.__v;
        delete json.updatedBy;
        delete json.updatedRef;
        response = await addNewEventCategoryAction(json);

        if (response[0] === 201) {
          toast.success(response[1]?.message);
          const newResponse = {
            ...response[1]?.data,

            createdBy: {
              _id: profileDetails._id,
              name: profileDetails.name,
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
          toast.error(response[1]?.message);
        }
      }
    } catch (error) {
      console.error("Error in submitNewCategoryHandler:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  }, [
    validateAllErrors,
    info?.name,
    info?.editId,
    addNewEventCategoryAction,
    updateEventCategoryAction,
    profileDetails,
    eventCategories,
    dispatch,
  ]);




  const deletePopupModalFunc = useCallback((deleteId = null) => {
    setInfo((prev) => ({ ...prev, deleteId, deleteInput: '' }));
  }, []);

  const onPageChange = useCallback((page) => {
    setInfo((prev) => ({ ...prev, page }));
  }, []);

  const deleteCategorySubmitHandler = useCallback(async () => {
    if (!info?.deleteId?._id || info?.deleteLoading) return;
    const response = await deleteCategoryAction(info?.deleteId?._id);
    let updateState = {};
    if (response[0] === true) {
      let newResponse = { ...eventCategories };
      newResponse.docs = newResponse.docs.filter((item) => item._id !== info?.deleteId?._id);

      dispatch({
        type: EVENT_CATEGORIES.success,
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

  const updateCateogory = (row) => {
    setInfo((prev) => ({
      ...prev,
      name: row?.name,
      editId: row?._id,
      isOpen: true,
      row: eventCategories?.docs?.find(eventCategory => eventCategory._id === row?._id)
    }));
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
        docs={tableData}
        cardTitle="Categories"
        totalPages={eventCategories?.totalPages}
        currentPage={eventCategories?.currentPage}
        onPageChange={onPageChange}
        actions={(row) => <TableRow row={row} onDelete={deletePopupModalFunc} onUpdate={updateCateogory} />}
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
          />
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

export default memo(Categories);
