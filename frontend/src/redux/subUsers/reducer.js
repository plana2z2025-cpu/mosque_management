import {
  ADMINISTRATORS,
  CLEAR_ADMINISTRATORS_ERRORS,
  RESET_ADMINISTRATORS_STATE,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  administrators: null,
};

export const AdministratorReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading state
    [ADMINISTRATORS.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success state
    [ADMINISTRATORS.success]: () => ({
      ...state,
      loading: false,
      administrators: action.payload,
    }),

    // Failure state
    [ADMINISTRATORS.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'Failed to load administrators', // Default error message
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Clear errors
    [CLEAR_ADMINISTRATORS_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),

    // Reset state to initial
    [RESET_ADMINISTRATORS_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
