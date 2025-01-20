import {
  CLEAR_EVENT_ERRORS,
  RESET_EVENT_STATE,
  COMMUNITY_EVENTS,
  EVENT_CATEGORIES,
  EVENT_CATEGORIES_NAMES,
  EVENT_DASHBOARD_GRAPH,
  SINGLE_EVENT_DETAIL
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
  eventDetail: null,
};

export const EventReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading states
    [COMMUNITY_EVENTS.request]: () => ({
      ...state,
      loading: true,
    }),
    [EVENT_CATEGORIES.request]: () => ({
      ...state,
      loading: true,
    }),
    [EVENT_CATEGORIES_NAMES.request]: () => ({
      ...state,
      loading: true,
    }),
    [EVENT_DASHBOARD_GRAPH.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success states
    [COMMUNITY_EVENTS.success]: () => ({
      ...state,
      loading: false,
      allEvents: action.payload,
    }),
    [SINGLE_EVENT_DETAIL.success]: () => ({
      ...state,
      loading: false,
      eventDetail: action.payload,
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

    // Failure states using a utility function
    [COMMUNITY_EVENTS.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),
    [EVENT_CATEGORIES.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),
    [EVENT_CATEGORIES_NAMES.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),
    [EVENT_DASHBOARD_GRAPH.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Errors, Reset, Default
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
