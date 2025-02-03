import { GET_RAMADAN_TIMINGS, CLEAR_RAMADAN_ERRORS, RESET_RAMADAN_STATE } from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  ramadanTimings: null,
};

export const RamadaReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading state
    [GET_RAMADAN_TIMINGS.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success state
    [GET_RAMADAN_TIMINGS.success]: () => ({
      ...state,
      loading: false,
      ramadanTimings: action.payload,
    }),

    // Failure state
    [GET_RAMADAN_TIMINGS.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Failed to load data',
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Clear errors
    [CLEAR_RAMADAN_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),

    // Reset state to initial
    [RESET_RAMADAN_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
