import {
  CLEAR_EXPENSE_ERRORS,
  RESET_EXPENSE_STATE,
  EXPENSES,
  EXPENSE_CATEGORIES,
  EXPENSE_CATEGORIES_NAMES,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  allExpenses: null,
  expenseCategories: null,
  expenseCategoryNames: null,
};

export const ExpenseReducer = (state = initialState, action) => {
  const actionHandlers = {
    [EXPENSES.request || EXPENSE_CATEGORIES.request || EXPENSE_CATEGORIES_NAMES.request]: () => ({
      ...state,
      loading: true,
    }),
    [EXPENSES.success]: () => ({
      ...state,
      loading: false,
      allExpenses: action.payload,
    }),
    [EXPENSE_CATEGORIES.success]: () => ({
      ...state,
      loading: false,
      expenseCategories: action.payload,
    }),
    [EXPENSE_CATEGORIES_NAMES.success]: () => ({
      ...state,
      loading: false,
      expenseCategoryNames: action.payload,
    }),
    [EXPENSES.fail || EXPENSE_CATEGORIES.fail || EXPENSE_CATEGORIES_NAMES.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),

    // errors, reset, default
    [CLEAR_EXPENSE_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),
    [RESET_EXPENSE_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
