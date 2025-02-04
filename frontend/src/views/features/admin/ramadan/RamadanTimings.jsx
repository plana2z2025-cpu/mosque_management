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
import { Upload, Download, FilePenLine } from 'lucide-react';
import * as XLSX from 'xlsx';
import moment from 'moment';
import ModalV1 from '@/views/components2/modal/ModalV1';
import toast from 'react-hot-toast';
import { SUBMIT_BULK_TIMINGS } from '@/redux/ramadan/constant';
import { Input } from '@/components/ui/input';

const breadCumbs = [{ label: 'Ramadan Timings', href: null }];

const RamadanTimings = () => {
  const fileInputRef = useRef(null);
  const [info, setInfo] = useState({ fileName: null, days: null, showPopup: false, isEdit: false });

  const { ramadanTimings, bulkUpload, error } = useSelector((state) => state.ramadanState);
  const dispatch = useDispatch();
  const {
    getMosqueRamadanTimingsAction,
    submitBulkRamadanTimingsAction,
    clearRamadanErrorsAction,
  } = ramadanActions;

  useEffect(() => {
    if (!ramadanTimings) {
      fetchRamadanTimings();
    }
  }, []);

  useEffect(() => {
    if (bulkUpload?.isBulkSubmit) {
      toast.success('Bulk timings submitted successfully');
      bulkUploadClearResetFunction(false, true);
      closeModalPopupFunction();
    }
  }, [bulkUpload?.isBulkSubmit]);

  useEffect(() => {
    if (error && !bulkUpload?.isBulkSubmit) {
      toast.error(error);
      bulkUploadClearResetFunction(true, true);
    }
  }, [error]);

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
            sehri: moment()
              .hours(Math.floor(singleDay.sehri * 24))
              .minutes(Math.round(((singleDay.sehri * 24) % 1) * 60))
              .format('hh:mm A'),
            iftar: moment()
              .hours(Math.floor(singleDay.iftar * 24))
              .minutes(Math.round(((singleDay.iftar * 24) % 1) * 60))
              .format('hh:mm A'),
          }));
          setInfo((prev) => ({ ...prev, fileName: file?.name, days, showPopup: true }));
        };
        reader.readAsBinaryString(file);
      }
    },
    [info?.fileName]
  );

  const closeModalPopupFunction = () => {
    setInfo((prev) => ({ ...prev, showPopup: false, fileName: null, days: null }));
    fileInputRef.current.value = '';
  };

  const submitBulkUploadHandler = useCallback(() => {
    let json = {
      days: info?.days,
    };
    dispatch(submitBulkRamadanTimingsAction(json));
  }, []);

  const bulkUploadClearResetFunction = useCallback(
    (error = false, reset = false) => {
      if (error) {
        dispatch(clearRamadanErrorsAction());
      }

      if (reset) {
        dispatch({ type: SUBMIT_BULK_TIMINGS.reset });
      }
    },
    [error, bulkUpload?.isBulkSubmit]
  );

  const isEditableButtonHandlerFunction = useCallback(() => {
    let update = { ...info };
    if (update.isEdit) {
      update.isEdit = false;
    } else {
      update.isEdit = true;
    }

    setInfo(update);
  }, [info?.isEdit]);

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

        <Button
          className="bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 text-gray-900"
          onClick={isEditableButtonHandlerFunction}
        >
          <FilePenLine />
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
          <CardTitle>Ramadan Schedule {moment().year()}</CardTitle>
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
              {info?.isEdit
                ? ramadanTimings?.days?.map((day) => (
                    <TableRow key={day.uuid}>
                      <TableCell className="font-medium">
                        <Input
                          type="date"
                          value={moment(day.date).format('YYYY-MM-DD')}
                          className="w-40"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={day.dayOfRamadan}
                          className="w-20 mx-auto text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="time"
                          value={moment(day.sehri, 'hh:mm A').format('hh:mm')}
                          className="w-32 mx-auto text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="time"
                          value={moment(day.iftar, 'hh:mm A').format('hh:mm')}
                          className="w-32 mx-auto text-center"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : ramadanTimings?.days?.map((day) => (
                    <TableRow key={day.uuid}>
                      <TableCell className="font-medium">
                        {moment(day.date).format('YYYY-MM-DD')}
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

      <ModalV1 isOpen={info?.showPopup} title={info?.fileName} onClose={closeModalPopupFunction}>
        <Card className="w-full">
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
                {info?.days?.map((day, index) => (
                  <TableRow key={index + 'demo_data'}>
                    <TableCell className="font-medium">{day.date}</TableCell>
                    <TableCell className="text-center">{day.dayOfRamadan}</TableCell>
                    <TableCell className="text-center">{day.sehri}</TableCell>
                    <TableCell className="text-center">{day.iftar}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Button className="mt-4 float-end" onClick={submitBulkUploadHandler}>
          Submit
        </Button>
      </ModalV1>
    </Mainwrapper>
  );
};

export default memo(RamadanTimings);
