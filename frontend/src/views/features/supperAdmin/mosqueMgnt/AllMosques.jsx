import React from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomPagination from '@/views/components2/pagination/CustomPagination';

const breadCumbs = [
  { label: 'Mosques', href: null },
  // { label: 'Data Fetching', href: null },
];

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
                <TableHead>Address</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Facilities</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.docs.map((mosque) => (
                <TableRow key={mosque._id}>
                  <TableCell className="font-medium">{mosque.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{mosque.address.street}</p>
                      <p>
                        {mosque.address.city}, {mosque.address.country.toUpperCase()}
                      </p>
                      <p>{mosque.address.postalCode}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{mosque.contactInfo.phone}</p>
                      <p>{mosque.contactInfo.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {mosque.facilities.map((facility) => (
                        <Badge key={facility} variant="secondary">
                          {facility.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={mosque.active ? 'success' : 'destructive'}>
                      {mosque.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            {/* <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}

            <CustomPagination
              currentPage={2}
              totalPages={10}
              onPageChange={(page) => {}}
              siblingsCount={1} // How many numbers to show around current page
              boundaryCount={1} // How many numbers to show at start/end
            />
          </div>
        </CardContent>
      </Card>
    </Mainwrapper>
  );
};

export default AllMosques;
