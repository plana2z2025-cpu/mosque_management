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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomPagination from '@/views/components2/pagination/CustomPagination';
import { mosqueActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import { FilePenLine, View, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const breadCumbs = [{ label: 'Mosques', href: null }];

const AllMosques = () => {
  const { getSuperAdminMosqueAction } = mosqueActions;
  const dispatch = useDispatch();
  const { loading, supperAdminMosques } = useSelector((state) => state.mosqueState);
  const navigate = useNavigate();
  const [info, setinfo] = useState({
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    if (!supperAdminMosques || supperAdminMosques?.currentPage !== info?.page) {
      dispatch(getSuperAdminMosqueAction(`limit=${info.limit}&page=${info.page}`));
    }
  }, [info?.page]);

  const changePagination = (page) => {
    setinfo((prev) => ({ ...prev, page }));
  };

  const navigateFun = (slug, view = true) => {
    view ? navigate(slug) : navigate(`${slug}/edit`);
  };
  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <h1>All Mosques</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mosque Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Facilities</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-scroll">
              {supperAdminMosques?.docs?.map((mosque) => (
                <TableRow key={mosque._id}>
                  <TableCell className="font-medium">{mosque?.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">{mosque?.contactInfo?.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{mosque?.contactInfo?.phone}</div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      <p>{mosque?.address?.street}</p>
                      <p>
                        {mosque?.address?.city}, {mosque?.address?.country?.toUpperCase()}
                      </p>
                      <p>{mosque?.address?.postalCode}</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">{mosque?.facilities?.join(', ')}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={mosque?.active ? 'success' : 'destructive'}>
                      {mosque?.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-5">
                      <View
                        color="purple"
                        className="cursor-pointer size-5"
                        onClick={() => navigateFun(mosque?.slug)}
                      />
                      <FilePenLine color="green" className="cursor-pointer size-5" />
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

export default AllMosques;
