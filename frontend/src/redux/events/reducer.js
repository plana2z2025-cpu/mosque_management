import {
  CLEAR_EVENT_ERRORS,
  RESET_EVENT_STATE,
  COMMUNITY_EVENTS,
  EVENT_CATEGORIES,
  EVENT_CATEGORIES_NAMES,
  EVENT_DASHBOARD_GRAPH,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  allEvents: null,
  eventCategories: null,
  eventCategoryNames: null,
  eventTypeBasedCount: null,
  eventStatusBasedCount: null,
};

export const EventReducer = (state = initialState, action) => {
  const actionHandlers = {
    [COMMUNITY_EVENTS.request ||
    EVENT_CATEGORIES.request ||
    EVENT_CATEGORIES_NAMES.request ||
    EVENT_DASHBOARD_GRAPH.request]: () => ({
      ...state,
      loading: true,
    }),
    [COMMUNITY_EVENTS.success]: () => ({
      ...state,
      loading: false,
      allEvents: action.payload,
    }),
    [EVENT_CATEGORIES.success]: () => ({
      ...state,
      loading: false,
      eventCategories: action.payload,
    }),
    [EVENT_CATEGORIES_NAMES.success]: () => ({
      ...state,
      loading: false,
      eventCategoryNames: action.payload,
    }),
    [EVENT_DASHBOARD_GRAPH.success]: () => ({
      ...state,
      loading: false,
      eventTypeBasedCount: action.payload?.eventTypeBasedCount || [],
      eventStatusBasedCount: action.payload?.eventStatusBasedCount || [],
    }),
    [COMMUNITY_EVENTS.fail ||
    EVENT_CATEGORIES.fail ||
    EVENT_CATEGORIES_NAMES.fail ||
    EVENT_DASHBOARD_GRAPH.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),

    // errors, reset, default
    [CLEAR_EVENT_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),
    [RESET_EVENT_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
