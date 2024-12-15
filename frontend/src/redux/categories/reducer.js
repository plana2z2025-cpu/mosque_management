import {
  EVENT_CATEGORIES,
  CLEAR_EVENT_CATEGORIES_ERRORS,
  RESET_EVENT_CATEGORIES_STATE,
  EVENT_CATEGORIES_NAMES,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  eventCategories: null,
  eventCategoryNames: null,
};

export const EventCategoriesReducer = (state = initialState, action) => {
  const actionHandlers = {
    [EVENT_CATEGORIES.request || EVENT_CATEGORIES_NAMES.request]: () => ({
      ...state,
      loading: true,
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
    [EVENT_CATEGORIES.fail || EVENT_CATEGORIES_NAMES.fail]: () => ({
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
