import React, { memo, useCallback, useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { eventActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomTable1 from '@/views/components2/tables/CustomTable1';
import { Trash } from 'lucide-react';
import EventTypeBasedCount from '@/views/components2/graphs/EventTypeBasedCount';
import { Card } from '@/components/ui/card';
import EventStatusBasedCount from '@/views/components2/graphs/EventStatusBasedCount';

const breadCumbs = [{ label: 'Analytics', href: null }];

const Analytics = () => {
  const { eventDashboardGraphAction } = eventActions;
  const dispatch = useDispatch();
  const { eventTypeBasedCount, eventStatusBasedCount } = useSelector((state) => state.eventState);

  useEffect(() => {
    if (!eventTypeBasedCount || !eventStatusBasedCount) {
      fetchEventDashboardGraphCount();
    }
  }, [eventTypeBasedCount, eventStatusBasedCount]);

  const fetchEventDashboardGraphCount = useCallback(() => {
    dispatch(eventDashboardGraphAction());
  }, [eventTypeBasedCount, eventStatusBasedCount]);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <EventTypeBasedCount data={eventTypeBasedCount} />
        </Card>

        <Card>
          <EventStatusBasedCount data={eventStatusBasedCount} />
        </Card>
      </div>
    </Mainwrapper>
  );
};

export default memo(Analytics);
