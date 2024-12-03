import React, { useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { administratorActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import { Trash } from 'lucide-react';
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

const breadCumbs = [{ label: 'Administrators', href: null }];

const headers = [
  { title: 'ID', key: '_id' },
  { title: 'Name', key: 'name' },
  { title: 'Created On', key: 'createdAt' },
];

const Administrators = () => {
  const dispatch = useDispatch();
  const { getAdministratorsAction, addNewSubUserAction } = administratorActions;
  const { loading, administrators } = useSelector((state) => state.administratorState);

  const [info, setInfo] = useState({
    limit: 10,
    page: 1,
    name: '',
    password: '',
    isOpen: false,
  });

  const [error, setError] = useState({});

  useEffect(() => {
    if (!administrators) {
      dispatch(getAdministratorsAction(`limit=${info.limit}&page=${info.page}`));
    }
  }, []);

  const changeHandlerFunction = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));

    let newError = validateField(name, value);
    setError((prev) => ({
      ...prev,
      [name]: newError,
    }));
  };

  const validateField = (key, value) => {
    const validateRules = {
      name: () =>
        value.trim() === ''
          ? 'Name is required'
          : administrators?.find((item) => item.name.toLowerCase() === value.toLowerCase())
            ? ' user with this name already exists'
            : null,
      password: () => (value.length < 8 ? 'Password must be at least 8 characters' : null),
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

  const submitNewUserHandler = async () => {
    const havingErrors = validateAllErrors();
    if (!havingErrors) return;

    const json = {
      name: info?.name,
      password: info?.password,
    };

    const response = await addNewSubUserAction(json);
    if (response[0] === 201) {
      toast.success(response[1]?.message);
      dispatch(getAdministratorsAction());
      setInfo((prev) => ({
        ...prev,
        name: '',
        password: '',
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
            <Button variant="outline">Add User</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Sub-User</DialogTitle>
            <DialogDescription>
              Create a new sub-user account with a name and password.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>

              <div className="col-span-3">
                <Input
                  id="name"
                  placeHolder={'Enter the name'}
                  value={info?.name}
                  name={'name'}
                  onChange={changeHandlerFunction}
                />
                {error?.name && <span className="text-red-600 text-[10px]">{error?.name}</span>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              password
            </Label>
            <div className="col-span-3">
              <Input
                id="username"
                placeHolder={'Enter the password'}
                value={info?.password}
                name={'password'}
                onChange={changeHandlerFunction}
              />
              {error?.password && (
                <span className="text-red-600 text-[10px]">{error?.password}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={submitNewUserHandler}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CustomTable1
        headers={headers}
        docs={administrators?.map((item) => ({
          ...item,
          createdAt: moment(item.createdAt).format('DD/MM/yyyy'),
        }))}
        cardTitle="Sub - Users"
      />
    </Mainwrapper>
  );
};

export default Administrators;
