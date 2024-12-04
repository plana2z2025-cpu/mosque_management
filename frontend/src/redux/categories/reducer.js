import {
  EVENT_CATEGORIES,
  CLEAR_EVENT_CATEGORIES_ERRORS,
  RESET_EVENT_CATEGORIES_STATE,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  eventCategories: null,
};

export const EventCategoriesReducer = (state = initialState, action) => {
  const actionHandlers = {
    [EVENT_CATEGORIES.request]: () => ({
      ...state,
      loading: true,
    }),
    [EVENT_CATEGORIES.success]: () => ({
      ...state,
      loading: false,
      eventCategories: action.payload,
    }),
    [EVENT_CATEGORIES.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),

    // errors, reset, default
    [CLEAR_EVENT_CATEGORIES_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),
    [RESET_EVENT_CATEGORIES_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
