import { CLEAR_EVENT_ERRORS, RESET_EVENT_STATE, COMMUNITY_EVENTS } from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  allEvents: null,
};

export const EventReducer = (state = initialState, action) => {
  const actionHandlers = {
    [COMMUNITY_EVENTS.request]: () => ({
      ...state,
      loading: true,
    }),
    [COMMUNITY_EVENTS.success]: () => ({
      ...state,
      loading: false,
      allEvents: action.payload,
    }),
    [COMMUNITY_EVENTS.fail]: () => ({
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
