import React, { useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomPagination from '@/views/components2/pagination/CustomPagination';
import { administratorActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import { Trash } from 'lucide-react';
import moment from 'moment';

const breadCumbs = [{ label: 'Administrators', href: null }];

const Administrators = () => {
  const supperAdminMosques = {};
  const dispatch = useDispatch();
  const { getAdministratorsAction } = administratorActions;
  const { loading, administrators } = useSelector((state) => state.administratorState);

  const [info, setInfo] = useState({
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    if (!administrators || administrators?.currentPage !== info?.page) {
      dispatch(getAdministratorsAction(`limit=${info.limit}&page=${info.page}`));
    }
  }, [info?.page]);
  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      {' '}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sub - Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-scroll">
              {administrators?.map((subUser, index) => (
                <TableRow key={subUser?._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="text-sm">{subUser?._id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{subUser?.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{moment(subUser?.createdAt).format('L')}</div>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-5">
                      <Trash color="red" className="cursor-pointer size-5" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            <CustomPagination
              currentPage={supperAdminMosques?.currentPage || 1}
              totalPages={supperAdminMosques?.totalPages || 1}
              onPageChange={(page) => changePagination(page)}
              siblingsCount={1}
              boundaryCount={1}
            />
          </div>
        </CardContent>
      </Card>
    </Mainwrapper>
  );
};

export default Administrators;
