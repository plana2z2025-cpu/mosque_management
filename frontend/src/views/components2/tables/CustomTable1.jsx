import React from 'react';
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

const CustomTable1 = ({
  headers,
  docs,
  onRowAction,
  actionColumn,
  index = true,
  cardTitle = '',
  pagination = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  // Check if data is empty
  const isEmptyData = !docs || docs?.length === 0;

  return (
    <Card className="w-full">
      {cardTitle && (
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {index && <TableHead>S.No</TableHead>}
              {headers.map((header, index) => (
                <TableHead key={index}>{header.title}</TableHead>
              ))}
              {actionColumn && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmptyData ? (
              <TableRow>
                <TableCell
                  colSpan={headers.length + (actionColumn ? 1 : 0) + (index ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              docs?.map((item, rowIndex) => (
                <TableRow key={rowIndex}>
                  {index && <TableCell>{rowIndex + 1}.</TableCell>}
                  {headers.map((header, colIndex) => (
                    <TableCell key={colIndex}>
                      <div className="text-sm">{item[header.key] || 'N/A'}</div>
                    </TableCell>
                  ))}
                  {actionColumn && (
                    <TableCell>
                      {onRowAction && (
                        <div className="flex gap-3">{onRowAction(item, rowIndex)}</div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {pagination && totalPages !== 1 && (
          <div className="mt-4">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => onPageChange(page)}
              siblingsCount={1}
              boundaryCount={1}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomTable1;
