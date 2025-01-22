import {
  CLEAR_EXPENSE_ERRORS,
  RESET_EXPENSE_STATE,
  EXPENSES,
  EXPENSE_CATEGORIES,
  EXPENSE_CATEGORIES_NAMES,
  UPDATE_CATEGORY,
  EXPENSE_DASHBOARD_GRAPH,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  allExpenses: null,
  expenseCategories: null,
  expenseCategoryNames: null,
  expenseTypeGraph: null,
  expenseStatusGraph: null,
  expensePaymentGraph: null,
};

export const ExpenseReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading states
    [EXPENSES.request]: () => ({
      ...state,
      loading: true,
    }),
    [EXPENSE_CATEGORIES.request]: () => ({
      ...state,
      loading: true,
    }),
    [EXPENSE_CATEGORIES_NAMES.request]: () => ({
      ...state,
      loading: true,
    }),
    [EXPENSE_DASHBOARD_GRAPH.request]: () => ({
      ...state,
      loading: true,
    }),
    [UPDATE_CATEGORY.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success states
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
    [EXPENSE_DASHBOARD_GRAPH.success]: () => ({
      ...state,
      loading: false,
      expenseTypeGraph: action.payload?.expenseTypeGraph || [],
      expenseStatusGraph: action.payload?.expenseStatusGraph || [],
      expensePaymentGraph: action.payload?.expensePaymentGraph || [],
    }),
    [UPDATE_CATEGORY.success]: () => ({
      ...state,
      loading: false,
      expenseCategories: action.payload,
    }),

    // Failure states
    [EXPENSES.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'An error occurred',
      statusCode: action?.payload?.statusCode || 500,
    }),
    [EXPENSE_CATEGORIES.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'An error occurred',
      statusCode: action?.payload?.statusCode || 500,
    }),
    [EXPENSE_CATEGORIES_NAMES.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'An error occurred',
      statusCode: action?.payload?.statusCode || 500,
    }),
    [EXPENSE_DASHBOARD_GRAPH.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'An error occurred',
      statusCode: action?.payload?.statusCode || 500,
    }),
    [UPDATE_CATEGORY.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Errors, Reset, Default
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
