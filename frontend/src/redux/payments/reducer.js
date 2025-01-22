import {
  CLEAR_PAYEE_ERRORS,
  RESET_PAYEE_STATE,
  PAYEES_LIST,
  UPDATE_PAYEE,
  SINGLE_PAYEE_DETAIL,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  allPayee: null,
  payeeDetail: null,
};

export const PayementsReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading states
    [PAYEES_LIST.request]: () => ({
      ...state,
      loading: true,
    }),
    [SINGLE_PAYEE_DETAIL.request]: () => ({
      ...state,
      loading: true,
    }),
    [UPDATE_PAYEE.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success states
    [PAYEES_LIST.success]: () => ({
      ...state,
      loading: false,
      allPayee: action.payload,
    }),
    [SINGLE_PAYEE_DETAIL.success]: () => ({
      ...state,
      loading: false,
      payeeDetail: action.payload,
    }),

    // Update payee
    [PAYEES_LIST.update]: () => ({
      ...state,
      allPayee: action.payload,
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

    // Failure states
    [PAYEES_LIST.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),
    [SINGLE_PAYEE_DETAIL.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
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
