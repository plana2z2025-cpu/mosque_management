import {
  CLEAR_PAYEE_ERRORS,
  RESET_PAYEE_STATE,
  PAYEE,
  UPDATE_PAYEE,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  allPayee: null,
};

export const PayementsReducer = (state = initialState, action) => {
  const actionHandlers = {
    [PAYEE.request]: () => ({
      ...state,
      loading: true,
    }),
    [PAYEE.success]: () => ({
      ...state,
      loading: false,
      allPayee: action.payload,
    }),
    [PAYEE.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),
    [UPDATE_PAYEE.request]: () => ({
      ...state,
      loading: true,
    }),
    [UPDATE_PAYEE.success]: () => ({
      ...state,
      loading: false,
      allPayee: state.allPayee
        ? {
          ...state.allPayee,
          data: Array.isArray(state.allPayee.data)
            ? state.allPayee.data.map((payee) =>
              payee.id === action.payload.id ? action.payload : payee
            )
            : state.allPayee.data,
        }
        : null,
    }),

    [UPDATE_PAYEE.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Errors, Reset, Default
    [CLEAR_PAYEE_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),
    [RESET_PAYEE_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
