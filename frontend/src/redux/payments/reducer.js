import {
  CLEAR_PAYEE_ERRORS,
  RESET_PAYEE_STATE,
  PAYEE,
  // EXPENSE_CATEGORIES,
  // EXPENSE_CATEGORIES_NAMES,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  allPayee: null,
  // expenseCategories: null,
  // expenseCategoryNames: null,
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
    // [EXPENSE_CATEGORIES.success]: () => ({
    //   ...state,
    //   loading: false,
    //   expenseCategories: action.payload,
    // }),
    // [EXPENSE_CATEGORIES_NAMES.success]: () => ({
    //   ...state,
    //   loading: false,
    //   expenseCategoryNames: action.payload,
    // }),
    [PAYEE.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),

    // errors, reset, default
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
