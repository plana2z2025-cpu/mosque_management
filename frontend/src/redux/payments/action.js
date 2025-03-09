import {
  CLEAR_PAYEE_ERRORS,
  RESET_PAYEE_STATE,
  PAYEES_LIST,
  UPDATE_PAYEE,
  SINGLE_PAYEE_DETAIL,
  SINGLE_PAYEE_EXPENSES,
  PAYEE_NAMES_LIST,
} from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';

const addNewPayeeAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_PAYEE}${API.PAYEE_TYPES.CREATE_NEW_PAYEE}`,
    json,
    token
  );

  return response;
};

const getPayeeDetailsAction = (payeeId) => async (dispatch) => {
  const token = getAccessToken();
  dispatch({ type: SINGLE_PAYEE_DETAIL.request });
  const response = await Service.fetchGet(`${API.BASE_PAYEE}/${payeeId}`, token);
  if (response[0] === true) {
    dispatch({ type: SINGLE_PAYEE_DETAIL.success, payload: response[1].data });
  } else {
    dispatch({ type: SINGLE_PAYEE_DETAIL.fail, payload: response[1] });
  }
};

const getAllPayeeAction =
  (query = null) =>
  async (dispatch) => {
    dispatch({ type: PAYEES_LIST.request });
    const token = getAccessToken();
    const response = await Service.fetchGet(
      `${API.BASE_PAYEE}${API.PAYEE_TYPES.PAYEES}${query ? '?' + query : ''}`,
      token
    );

    if (response[0] === true) {
      dispatch({ type: PAYEES_LIST.success, payload: response[1].data });
    } else {
      dispatch({
        type: PAYEES_LIST.fail,
        payload: response[1],
      });
    }
  };

const getAllPayeeNamesAction = () => async (dispatch) => {
  dispatch({ type: PAYEE_NAMES_LIST.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_PAYEE}${API.PAYEE_TYPES.PAYEES}${API.PAYEE_TYPES.ALL}${API.PAYEE_TYPES.NAMES}`,
    token
  );

  if (response[0] === true) {
    dispatch({ type: PAYEE_NAMES_LIST.success, payload: response[1].data });
  } else {
    dispatch({
      type: PAYEE_NAMES_LIST.fail,
      payload: response[1],
    });
  }
};

const updatePayeeAction = (payeeId, json) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYEE.request });
  const token = getAccessToken();

  try {
    const response = await Service.fetchPut(`${API.BASE_PAYEE}/${payeeId}`, json, token);
    dispatch({ type: UPDATE_PAYEE.success, payload: response.data });
    return [200, response.data]; // Return a success status code with data
  } catch (error) {
    dispatch({
      type: UPDATE_PAYEE.fail,
      payload: { message: error.message, statusCode: error.status || 500 },
    });
    return [error.status || 500, { message: error.message }]; // Return failure with status and message
  }
};

const deletePayeeAction = async (payeeId) => {
  const token = getAccessToken();
  const response = await Service.fetchDelete(`${API.BASE_PAYEE}/${payeeId}`, token);
  return response;
};

const getPayeeExpensesAction = (payeeId, query) => async (dispatch) => {
  dispatch({ type: SINGLE_PAYEE_EXPENSES.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_PAYEE}/${payeeId}${API.PAYEE_TYPES.EXPENSES}${query ? '?' + query : ''}`,
    token
  );

  if (response[0] === true) {
    dispatch({ type: SINGLE_PAYEE_EXPENSES.success, payload: response[1].data });
  } else {
    dispatch({
      type: SINGLE_PAYEE_EXPENSES.fail,
      payload: response[1],
    });
  }
};

// ----------------------------------------------------------------
// CLEAR & RESET STATES
// ----------------------------------------------------------------

const clearPayeeAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_PAYEE_ERRORS,
  });
};

const resetPayeeAction = () => (dispatch) => {
  dispatch({ type: RESET_PAYEE_STATE });
};

export default {
  clearPayeeAction,
  resetPayeeAction,

  // PAYEE
  addNewPayeeAction,
  getPayeeDetailsAction,
  getAllPayeeAction,
  updatePayeeAction,
  deletePayeeAction,
  getPayeeExpensesAction,
  getAllPayeeNamesAction,
};
