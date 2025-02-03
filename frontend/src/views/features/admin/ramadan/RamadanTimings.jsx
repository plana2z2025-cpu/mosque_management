import React, { memo, useRef, useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { ramadanActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import moment from 'moment';

const breadCumbs = [{ label: 'Ramadan Timings', href: null }];

const RamadanTimings = () => {
  const fileInputRef = useRef(null);
  const [info, setInfo] = useState({ fileName: null, days: [] });

  const { ramadanTimings } = useSelector((state) => state.ramadanState);
  const dispatch = useDispatch();
  const { getMosqueRamadanTimingsAction } = ramadanActions;

  useEffect(() => {
    if (!ramadanTimings) {
      fetchRamadanTimings();
    }
  }, []);

  const fetchRamadanTimings = useCallback(() => {
    dispatch(getMosqueRamadanTimingsAction());
  }, [ramadanTimings]);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const fileUploadHandler = useCallback(
    (event) => {
      let file = event?.target?.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          let days = XLSX.utils.sheet_to_json(worksheet);
          days = days?.map((singleDay) => ({
            ...singleDay,
            date: moment('1899-12-30').add(singleDay.date, 'days').format('YYYY-MM-DD'),
            dayOfRamadan: singleDay.dayOfRamadan,
            sehri: moment(singleDay.sehri * 24, 'H').format('hh:mm A'),
            iftar: moment(singleDay.iftar * 24, 'H').format('hh:mm A'),
          }));
          setInfo((prev) => ({ ...prev, fileName: file?.name, days }));
        };
        reader.readAsBinaryString(file);
      }
    },
    [info?.fileName]
  );
  console.log(info);
  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className="flex justify-end  space-x-4">
        <Button
          onClick={triggerFileInput}
          className="bg-green-500 hover:bg-green-600 text-gray-900"
        >
          <Upload className="mr-2" />
          Upload Excel Sheet
        </Button>

        <Button>
          <Download className="mr-2" />
          Download Sample
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={fileUploadHandler}
          accept=".xlsx, .xls"
          className="hidden"
        />
        {info?.fileName && <span className="text-sm text-gray-600">{info?.fileName}</span>}
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ramadan Schedule 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Day of Ramadan</TableHead>
                <TableHead className="text-center">Sehri</TableHead>
                <TableHead className="text-center">Iftar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ramadanTimings?.days?.map((day) => (
                <TableRow key={day.uuid}>
                  <TableCell className="font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-center">{day.dayOfRamadan}</TableCell>
                  <TableCell className="text-center">{day.sehri}</TableCell>
                  <TableCell className="text-center">{day.iftar}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Mainwrapper>
  );
};

export default memo(RamadanTimings);
