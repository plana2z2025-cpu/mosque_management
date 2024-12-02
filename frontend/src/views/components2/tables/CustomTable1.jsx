import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CustomTable1 = ({ headers, docs, onRowAction, actionColumn }) => {
  // Check if data is empty
  const isEmptyData = !docs || docs?.length === 0;

  return (
    <Table>
      <TableHeader>
        <TableRow>
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
              colSpan={headers.length + (actionColumn ? 1 : 0)}
              className="h-24 text-center"
            >
              No data available
            </TableCell>
          </TableRow>
        ) : (
          docs?.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, colIndex) => (
                <TableCell key={colIndex}>
                  <div className="text-sm">{item[header.key] || 'N/A'}</div>
                </TableCell>
              ))}
              {actionColumn && (
                <TableCell>
                  {onRowAction && <div className="flex gap-3">{onRowAction(item, rowIndex)}</div>}
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CustomTable1;
