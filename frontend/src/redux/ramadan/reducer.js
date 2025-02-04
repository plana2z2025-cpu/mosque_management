import {
  GET_RAMADAN_TIMINGS,
  CLEAR_RAMADAN_ERRORS,
  RESET_RAMADAN_STATE,
  SUBMIT_BULK_TIMINGS,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  ramadanTimings: null,
  bulkUpload: {
    loading: false,
    isBulkSubmit: null,
  },
};

export const RamadaReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading state
    [GET_RAMADAN_TIMINGS.request]: () => ({
      ...state,
      loading: true,
    }),

    [SUBMIT_BULK_TIMINGS.request]: () => ({
      ...state,
      bulkUpload: {
        ...state.bulkUpload,
        loading: true,
      },
    }),

    // Success state
    [GET_RAMADAN_TIMINGS.success]: () => ({
      ...state,
      loading: false,
      ramadanTimings: action.payload,
    }),

    [SUBMIT_BULK_TIMINGS.success]: () => ({
      ...state,
      ramadanTimings: action.payload,
      bulkUpload: {
        ...state.bulkUpload,
        loading: true,
        isBulkSubmit: true,
      },
    }),

    // Failure state
    [GET_RAMADAN_TIMINGS.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Failed to load data',
      statusCode: action?.payload?.statusCode || 500,
    }),

    [SUBMIT_BULK_TIMINGS.fail]: () => ({
      ...state,
      error: action?.payload?.message || 'Failed to submit',
      statusCode: action?.payload?.statusCode || 500,
      bulkUpload: {
        ...state.bulkUpload,
        loading: false,
        isBulkSubmit: false,
      },
    }),

    // Reset individual
    [SUBMIT_BULK_TIMINGS.reset]: () => ({
      ...state,
      bulkUpload: {
        ...state.bulkUpload,
        isBulkSubmit: null,
      },
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
