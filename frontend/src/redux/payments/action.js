import {
  CLEAR_PAYEE_ERRORS,
  RESET_PAYEE_STATE,
  PAYEE,
  UPDATE_PAYEE
} from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';


const addNewPayeeAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `/expenses/payee/create-new-payee`,
    json,
    token
  );

  return response;
};

const getPayeeDetailsAction = async (payeeId) => {
  const token = getAccessToken();
  const response = await Service.fetchGet(`/expenses/payee/${payeeId}`, token);
  return response;
};

const getAllPayeeAction =
  (query = null) =>
    async (dispatch) => {
      dispatch({ type: PAYEE.request });
      const token = getAccessToken();
      const response = await Service.fetchGet(
        `${API.BASE_PAYEE}${API.PAYEES}${query ? '?' + query : ''}`,
        token
      );

      if (response[0] === true) {
        dispatch({ type: PAYEE.success, payload: response[1].data });
      } else {
        dispatch({
          type: PAYEE.fail,
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
};
