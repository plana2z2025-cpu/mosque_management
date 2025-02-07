import React, { memo, useRef, useState, useEffect, useCallback, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
import { Upload, Download, FilePenLine } from 'lucide-react';
import * as XLSX from 'xlsx';
import moment from 'moment';
import ModalV1 from '@/views/components2/modal/ModalV1';
import toast from 'react-hot-toast';
import { SUBMIT_BULK_TIMINGS } from '@/redux/ramadan/constant';
import templateExcelFile from '../../../../assets/excels/ramadan_timings_demo.xlsx';
import { Plus, Trash2 } from 'lucide-react';

const breadCumbs = [{ label: 'Ramadan Timings', href: null }];
const INITIAL_INFO = {
  fileName: null,
  days: null,
  showPopup: false,
  isEdit: false,
  editableTimings: null,
};
const RamadanTimings = () => {
  const fileInputRef = useRef(null);
  const [info, setInfo] = useState({ ...INITIAL_INFO });

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
            date: moment('1899-12-30').add(singleDay.date, 'days').format('YYYY-MM-DD'),
            dayOfRamadan: singleDay.dayOfRamadan,
            sehri_start: moment()
              .hours(Math.floor(singleDay.sehriStartTime * 24))
              .minutes(Math.round(((singleDay.sehriStartTime * 24) % 1) * 60))
              .format('hh:mm A'),
            sehri_end: moment()
              .hours(Math.floor(singleDay.sehriEndTime * 24))
              .minutes(Math.round(((singleDay.sehriEndTime * 24) % 1) * 60))
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
  }, [info?.days]);

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
      update.editableTimings = [];
    } else {
      update.isEdit = true;
      update.editableTimings = ramadanTimings?.days || [];
    }

    setInfo(update);
  }, [info?.isEdit, info?.editableTimings, ramadanTimings?.days]);

  const downloadExcelHandlerFunction = useCallback(() => {
    const link = document.createElement('a');
    link.href = templateExcelFile;
    link.download = 'ramadan_timings_template.xlsx';

    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('successfully excel sheet is download');
  }, []);

  const addNewSingleTimingFunction = useCallback(() => {
    if (ramadanTimings?.days?.length === 0 || !ramadanTimings?.days) {
      return;
    }
    let updateTimings = [...info?.editableTimings];
    let lastTimings = updateTimings[updateTimings?.length - 1];
    let newTimings = {
      ...lastTimings,
      date: moment(lastTimings?.date).add(1, 'day'),
      dayOfRamadan: lastTimings?.dayOfRamadan + 1,
    };
    delete newTimings.uuid;
    delete newTimings._id;

    updateTimings.push(newTimings);
    setInfo((prev) => ({ ...prev, editableTimings: updateTimings }));
  }, [info?.editableTimings]);

  const deleteSingleTimingFunction = useCallback(
    (index) => {
      if ((info?.editableTimings?.length === 0) | !info?.editableTimings) {
        return;
      }

      let updateTimings = [...info?.editableTimings];
      updateTimings.splice(index, 1);
      setInfo((prev) => ({ ...prev, editableTimings: updateTimings }));
    },
    [info?.editableTimings]
  );

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

        <Button onClick={downloadExcelHandlerFunction}>
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
                <TableHead className="text-center">Day</TableHead>
                <TableHead className="text-center">Day of Ramadan</TableHead>
                <TableHead className="text-center">Sehri Start</TableHead>
                <TableHead className="text-center">Sehri End</TableHead>
                <TableHead className="text-center">Iftar</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {info?.isEdit
                ? info?.editableTimings?.map((day, index) => (
                    <TableRow key={day?.uuid || 'uuid' + index}>
                      <TableCell className="font-medium">
                        <Input
                          type="date"
                          value={moment(day.date).format('YYYY-MM-DD')}
                          className="w-40"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {moment(day.date).format('ddd')}
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={day.dayOfRamadan}
                          className="w-20 mx-auto text-center"
                          disabled={true}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="time"
                          value={moment(day.sehri_start, 'hh:mm A').format('hh:mm')}
                          className="w-32 mx-auto text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="time"
                          value={moment(day.sehri_end, 'hh:mm A').format('hh:mm')}
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
                      <TableCell
                        className="text-center"
                        onClick={() => deleteSingleTimingFunction(index)}
                      >
                        <Trash2 className="text-red-400 hover:text-red-600 cursor-pointer transition-colors" />
                      </TableCell>
                    </TableRow>
                  ))
                : ramadanTimings?.days?.map((day) => (
                    <TableRow key={day.uuid}>
                      <TableCell className="font-medium">
                        {moment(day.date).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell className="text-center">
                        {moment(day.date).format('ddd')}
                      </TableCell>
                      <TableCell className="text-center">{day.dayOfRamadan}</TableCell>
                      <TableCell className="text-center">{day.sehri_start}</TableCell>
                      <TableCell className="text-center">{day.sehri_end}</TableCell>
                      <TableCell className="text-center">{day.iftar}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>

          {info?.isEdit && (
            <div className="flex gap-6 mt-4 mb-3 float-end">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                onClick={addNewSingleTimingFunction}
              >
                {' '}
                <Plus /> Add
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-gray-900">Update</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ModalV1 isOpen={info?.showPopup} title={info?.fileName} onClose={closeModalPopupFunction}>
        <Card className="w-full">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Day </TableHead>
                  <TableHead className="text-center">Sehri Start</TableHead>
                  <TableHead className="text-center">Sehri End</TableHead>
                  <TableHead className="text-center">Iftar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {info?.days?.map((day, index) => (
                  <TableRow key={index + 'demo_data'}>
                    <TableCell className="font-medium">{day.date}</TableCell>
                    <TableCell className="text-center">{day.dayOfRamadan}</TableCell>
                    <TableCell className="text-center">{day.sehri_start}</TableCell>
                    <TableCell className="text-center">{day.sehri_end}</TableCell>
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
