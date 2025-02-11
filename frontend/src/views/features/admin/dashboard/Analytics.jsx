import React, { memo, useCallback, useEffect, useState } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { eventActions, expenseActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import EventTypeBasedCount from '@/views/components2/graphs/EventTypeBasedCount';
import { Card } from '@/components/ui/card';
import EventStatusBasedCount from '@/views/components2/graphs/EventStatusBasedCount';
import ExpenseStatusGraph from '@/views/components2/graphs/ExpenseStatusBaseGraph';
import ExpenseTypeBasedGraph from '@/views/components2/graphs/ExpenseTypeBasedGraph';
import ExpensePaymentGraph from '@/views/components2/graphs/ExpensePaymentGraph';

const breadCumbs = [{ label: 'Analytics', href: null }];

const Analytics = () => {
  const { eventDashboardGraphAction } = eventActions;
  const { expenseDashboardGraphAction } = expenseActions;
  const dispatch = useDispatch();
  const { eventTypeBasedCount, eventStatusBasedCount } = useSelector((state) => state.eventState);
  const { expenseTypeGraph, expenseStatusGraph, expensePaymentGraph } = useSelector(
    (state) => state.expenseState
  );

  useEffect(() => {
    if (!eventTypeBasedCount || !eventStatusBasedCount) {
      fetchEventDashboardGraphCount();
    }
  }, [eventTypeBasedCount, eventStatusBasedCount]);

  useEffect(() => {
    if (!expenseTypeGraph || !expenseStatusGraph || !expensePaymentGraph) {
      fetchExpenseDashboardGraphCount();
    }
  }, [expenseTypeGraph, expenseStatusGraph, expensePaymentGraph]);

  const fetchEventDashboardGraphCount = useCallback(() => {
    dispatch(eventDashboardGraphAction());
  }, [eventTypeBasedCount, eventStatusBasedCount]);

  const fetchExpenseDashboardGraphCount = useCallback(() => {
    dispatch(expenseDashboardGraphAction());
  }, [expenseTypeGraph, expenseStatusGraph, expensePaymentGraph]);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className=" space-y-8 p-2">
        {' '}
        <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
          <Card>
            <EventTypeBasedCount data={eventTypeBasedCount} />
          </Card>

          <Card>
            <EventStatusBasedCount data={eventStatusBasedCount} />
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
          <Card>
            <ExpenseStatusGraph data={expenseStatusGraph} />
          </Card>
          <Card>
            <ExpensePaymentGraph data={expensePaymentGraph} />
          </Card>
        </div>
        <div className="grid grid-cols-1">
          <Card>
            <ExpenseTypeBasedGraph data={expenseTypeGraph} />
          </Card>
        </div>
      </div>
    </Mainwrapper>
  );
};

export default memo(Analytics);
