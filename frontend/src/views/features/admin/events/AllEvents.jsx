import React, { memo, useEffect, useState, useCallback } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { eventActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Trash, AlertCircle, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SINGLE_EVENT_DETAIL } from '@/redux/events/constant';

const breadCumbs = [{ label: 'Events', href: null }];

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Type', key: 'type' },
  { title: 'Event On', key: 'startDate' },
  { title: 'Time', key: 'time' },
  { title: 'Speakers', key: 'speakers' },
];

const INITIAL_STATE = {
  limit: 10,
  page: 1,
  deleteId: null,
  deleteInput: '',
  deleteLoading: false,
};

const TableRow = memo(({ row, onDelete, onUpdate }) => (
  <>
    <Trash color="red" className="cursor-pointer size-5" onClick={() => onDelete(row)} />
    <Pencil color="black" className="cursor-pointer size-5" onClick={() => onUpdate(row)} />
  </>
));

const AllEvents = () => {
  const { getCommunityEventsAction, deleteEventAction } = eventActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allEvents, eventCategoryNames, loading } = useSelector((state) => state.eventState || {});
  const [info, setInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!allEvents || allEvents?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getCommunityEventsAction(query));
    }
  }, [info?.page, allEvents?.currentPage, dispatch]);

  const deletePopupModalFunc = useCallback((deleteId = null) => {
    setInfo((prev) => ({ ...prev, deleteId, deleteInput: '' }));
  }, []);

  const changeInputDeleteHandlerFunction = useCallback((e) => {
    setInfo((prev) => ({ ...prev, deleteInput: e?.target?.value || '' }));
  }, []);

  const deleteEventSubmitHandler = useCallback(async () => {
    if (!info?.deleteId || info?.deleteLoading) return;
    setInfo((prev) => ({ ...prev, deleteLoading: true }));

    const response = await deleteEventAction(info?.deleteId?._id);

    if (response[0] === true) {
      toast.success('Event deleted successfully');
      // Optionally, you can refresh the events list here
      dispatch(getCommunityEventsAction(`limit=${info.limit}&page=${info.page}`));
      setInfo((prev) => ({ ...prev, deleteId: null, deleteLoading: false }));
    } else {
      toast.error(response[1]?.message || 'Failed to delete event');
      setInfo((prev) => ({ ...prev, deleteLoading: false }));
    }
  }, [dispatch, info?.deleteId, info?.deleteLoading, info?.limit, info?.page]);

  const updateEvent = (row) => {
    const matchedEvent = allEvents?.docs?.find((event) => event._id === row?._id);
    navigate(`/admin/events/event/${row?._id}`);
    dispatch({ type: SINGLE_EVENT_DETAIL.success, payload: matchedEvent });
  };

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className="w-full flex justify-end">
        <Button variant="outline" onClick={() => navigate('/admin/events/event/create')}>
          Add New Event
        </Button>
      </div>
      <CustomTable1
        headers={headers}
        docs={allEvents?.docs?.map((item) => {
          return {
            ...item,
            type:
              item.type?.name ||
              eventCategoryNames.find((category) => category._id === item.type)?.name ||
              '',
            startDate: moment(item?.startDate).format('DD/MM/yyyy'),
            time: moment(item?.time).format('HH:mm'),
            speakers: item.speakers?.map((speaker) => speaker.name).join(', '),
          };
        })}
        cardTitle="Events"
        loading={loading}
        totalPages={allEvents?.totalPages}
        currentPage={allEvents?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
        actions={(row) => (
          <TableRow row={row} onDelete={deletePopupModalFunc} onUpdate={updateEvent} />
        )}
      />

      {/* Delete Confirmation Modal */}

      <Dialog open={Boolean(info?.deleteId)} onOpenChange={() => deletePopupModalFunc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
          </DialogHeader>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This action cannot be undone. Please type the Event Title to confirm.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Input
              id="Event Title"
              value={info?.deleteInput}
              onChange={changeInputDeleteHandlerFunction}
              placeholder={`Type "${info?.deleteId?.title || ''}" to confirm`}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => deletePopupModalFunc(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteEventSubmitHandler}
              disabled={info?.deleteInput !== info?.deleteId?.title || info?.deleteLoading}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Mainwrapper>
  );
};

export default memo(AllEvents);
