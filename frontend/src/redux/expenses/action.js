import {
  CLEAR_EXPENSE_ERRORS,
  RESET_EXPENSE_STATE,
  EXPENSES,
  EXPENSE_CATEGORIES,
  EXPENSE_CATEGORIES_NAMES,
  EXPENSE_DASHBOARD_GRAPH,
} from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';

const addNewExpenseAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_TYPE}${API.EXPENSE_TYPE.CREATE_NEW_EXPENSE}`,
    json,
    token
  );

  return response;
};

const getAllExpensesAction =
  (query = null) =>
  async (dispatch) => {
    dispatch({ type: EXPENSES.request });
    const token = getAccessToken();
    const response = await Service.fetchGet(
      `${API.BASE_TYPE}${API.EXPENSE_TYPE.ALL}${query ? '?' + query : ''}`,
      token
    );

    if (response[0] === true) {
      dispatch({ type: EXPENSES.success, payload: response[1].data });
    } else {
      dispatch({
        type: EXPENSES.fail,
        payload: response[1],
      });
    }
  };

// ----------------------------------------------------------------
// CATEGORIES
// ----------------------------------------------------------------

const getExpenseCategoriesAction =
  (query = null) =>
  async (dispatch) => {
    dispatch({ type: EXPENSE_CATEGORIES.request });
    const token = getAccessToken();
    const response = await Service.fetchGet(
      `${API.BASE_TYPE_CATEGORY}${API.EXPENSE_CATEGORIES_TYPE.CATEGORIES}${query ? '?' + query : ''}`,
      token
    );

    if (response[0] === true) {
      dispatch({ type: EXPENSE_CATEGORIES.success, payload: response[1].data });
    } else {
      dispatch({
        type: EXPENSE_CATEGORIES.fail,
        payload: response[1],
      });
    }
  };

const addNewExpenseCategoryAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_TYPE_CATEGORY}${API.EXPENSE_CATEGORIES_TYPE.CREATE_NEW_CATEGORY}`,
    json,
    token
  );

  return response;
};

const getAllExpenseCategoryNamesAction = () => async (dispatch) => {
  dispatch({ type: EXPENSE_CATEGORIES_NAMES.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_TYPE_CATEGORY}${API.EXPENSE_CATEGORIES_TYPE.CATEGORIES}${API.EXPENSE_CATEGORIES_TYPE.ALL}${API.EXPENSE_CATEGORIES_TYPE.NAMES}`,
    token
  );

  if (response[0] === true) {
    dispatch({ type: EXPENSE_CATEGORIES_NAMES.success, payload: response[1].data });
  } else {
    dispatch({
      type: EXPENSE_CATEGORIES_NAMES.fail,
      payload: response[1],
    });
  }
};

const updateExpenseCategoryAction = async (categoryId, json) => {
  const token = getAccessToken();
  const response = await Service.fetchPut(
    `${API.BASE_TYPE_CATEGORY}/${categoryId}`,
    json,
    token
  );
  return response;
};

const deleteExpenseCategoryAction = async (categoryId) => {
  const token = getAccessToken();
  const response = await Service.fetchDelete(`${API.BASE_TYPE_CATEGORY}/${categoryId}`, token);
  return response;
};

// ----------------------------------------------------------------
// GRAPHS
// ----------------------------------------------------------------
const expenseDashboardGraphAction = () => async (dispatch) => {
  const token = getAccessToken();
  dispatch({ type: EXPENSE_DASHBOARD_GRAPH.request });
  const response = await Service.fetchGet(
    `${API.EXPENSE_TYPE.EXPENSES}${API.EXPENSE_TYPE.GRAPH}${API.EXPENSE_TYPE.DASHBOARD}`,
    token
  );

  if (response[0] === true) {
    dispatch({ type: EXPENSE_DASHBOARD_GRAPH.success, payload: response[1].data });
  } else {
    dispatch({
      type: EXPENSE_DASHBOARD_GRAPH.fail,
      payload: response[1],
    });
  }
};

// ----------------------------------------------------------------
// CLEAR & RESET STATES
// ----------------------------------------------------------------

const clearExpenseAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_EXPENSE_ERRORS,
  });
};

const resetExpenseAction = () => (dispatch) => {
  dispatch({ type: RESET_EXPENSE_STATE });
};

export default {
  clearExpenseAction,
  resetExpenseAction,

  // EXPENSES
  addNewExpenseAction,
  getAllExpensesAction,

  // CATEGORIES
  getExpenseCategoriesAction,
  addNewExpenseCategoryAction,
  getAllExpenseCategoryNamesAction,
  deleteExpenseCategoryAction,
  updateExpenseCategoryAction,

  // GRAPHS
  expenseDashboardGraphAction,
};
