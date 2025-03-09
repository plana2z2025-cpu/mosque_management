import {
  CLEAR_PAYEE_ERRORS,
  RESET_PAYEE_STATE,
  PAYEES_LIST,
  UPDATE_PAYEE,
  SINGLE_PAYEE_DETAIL,
  SINGLE_PAYEE_EXPENSES,
  PAYEE_NAMES_LIST,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  allPayee: null,
  payeeDetail: null,
  payeeExpenses: null,
  payeeNamesList: null,
};

export const PaymentsReducer = (state = initialState, action) => {
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
    [PAYEE_NAMES_LIST.request]: () => ({
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
    [SINGLE_PAYEE_EXPENSES.success]: () => ({
      ...state,
      loading: false,
      payeeExpenses: action.payload,
    }),
    [PAYEE_NAMES_LIST.success]: () => ({
      ...state,
      loading: false,
      payeeNamesList: action.payload,
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
    [SINGLE_PAYEE_EXPENSES.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),
    [PAYEE_NAMES_LIST.fail]: () => ({
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
