import React, { memo, useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { eventActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Trash, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ModalV1 from '@/views/components2/modal/ModalV1';

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
  name: '',
  isOpen: false,
};

const TableRow = memo(({ row, onDelete }) => (
  <Trash color="red" className="cursor-pointer size-5" />
));

const AllEvents = () => {
  const { getCommunityEventsAction } = eventActions;
  const dispatch = useDispatch();
  const { allEvents } = useSelector((state) => state.eventState);
  const [info, setInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!allEvents || allEvents?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getCommunityEventsAction(query));
    }
  }, [info?.page]);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <CustomTable1
        headers={headers}
        docs={allEvents?.docs?.map((item) => ({
          ...item,
          type: item.type?.name || '',
          startDate: moment(item?.startDate).format('DD/MM/yyyy'),
          time: moment(item?.time).format('HH:mm'),
          speakers: item.speakers?.map((item) => item.name).join(','),
        }))}
        cardTitle="Events"
        totalPages={allEvents?.totalPages}
        currentPage={allEvents?.currentPage}
        onPageChange={(page) => setInfo((prev) => ({ ...prev, page }))}
        actions={(row) => <TableRow row={row} />}
      />
    </Mainwrapper>
  );
};

export default memo(AllEvents);
