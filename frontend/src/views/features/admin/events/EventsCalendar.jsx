import React, { useState, useEffect, memo, useMemo } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { eventActions } from '@/redux/combineActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@/assets/css/events/calenderevent.css';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);
const breadCumbs = [{ label: 'Events', href: null }];
const INITIAL_STATE = {
  limit: 10,
  page: 1,
};

const EventCalendar = () => {
  const { getCommunityEventsAction } = eventActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allEvents, loading } = useSelector((state) => state.eventState || {});
  const [info, setInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!allEvents || allEvents?.currentPage !== info?.page) {
      const query = `limit=${info?.limit}&page=${info?.page}`;
      dispatch(getCommunityEventsAction(query));
    }
  }, [info?.page, allEvents?.currentPage, dispatch]);

  // Transform your events into the format required by react-big-calendar
  const calendarEvents = useMemo(
    () =>
      allEvents?.docs?.map((event) => ({
        id: event._id,
        title: event.title,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
      })) || [],
    [allEvents]
  );

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className="h-5/6">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          defaultDate={new Date()}
        />
      </div>
    </Mainwrapper>
  );
};

export default memo(EventCalendar);
