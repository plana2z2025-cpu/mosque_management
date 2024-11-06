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

const breadCumbs = [{ label: 'Mosques', href: null }];

const data = {
  totalDocs: 1,
  totalPages: 1,
  docs: [
    {
      address: {
        street: '123 Main St',
        city: 'new york',
        country: 'usa',
        postalCode: '10001',
      },
      contactInfo: {
        phone: '+1234567890',
        email: 'info@centralmosque.com',
      },
      _id: '6724f592be352370e568c3b6',
      name: 'Central Mosque',
      facilities: ['parking', 'wudu_area', 'women_section'],
      active: false,
      createdOn: 1730475409,
    },
  ],
  currentPage: 1,
  hasNext: false,
  hasPrev: false,
};

const AllMosques = () => {
  const { getSuperAdminMosqueAction } = mosqueActions;
  const dispatch = useDispatch();
  const { loading, supperAdminMosques } = useSelector((state) => state.mosqueState);
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
    console.log(page);
    setinfo((prev) => ({ ...prev, page }));
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
