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

const breadCumbs = [{ label: 'Administrators', href: null }];

const Administrators = () => {
  const dispatch = useDispatch();
  const { getAdministratorsAction } = administratorActions;
  const { loading, administrators } = useSelector((state) => state.administratorState);

  const [info, setInfo] = useState({
    limit: 10,
    page: 1,
    name: '',
    password: '',
  });

  useEffect(() => {
    if (!administrators || administrators?.currentPage !== info?.page) {
      dispatch(getAdministratorsAction(`limit=${info.limit}&page=${info.page}`));
    }
  }, [info?.page]);

  const headers = [
    { title: 'ID', key: '_id' },
    { title: 'Name', key: 'name' },
    { title: 'Created On', key: 'createdAt' },
  ];
  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-full flex justify-end">
            <Button variant="outline">Add User</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Sub-User</DialogTitle>
            <DialogDescription>
              Create a new sub-user account with a name and password.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeHolder={'Enter the name'}
                value={info?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                password
              </Label>
              <Input
                id="username"
                placeHolder={'Enter the password'}
                value={info?.password}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
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
