import {
  GET_RAMADAN_TIMINGS,
  CLEAR_RAMADAN_ERRORS,
  RESET_RAMADAN_STATE,
  SUBMIT_BULK_TIMINGS,
} from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';

const getMosqueRamadanTimingsAction = () => async (dispatch) => {
  dispatch({ type: GET_RAMADAN_TIMINGS.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_TYPE}${API.RAMADAN_TIMINGS.COMMUNITY}`,
    token
  );
  if (response[0] === true) {
    dispatch({ type: GET_RAMADAN_TIMINGS.success, payload: response[1].data });
  } else {
    dispatch({
      type: GET_RAMADAN_TIMINGS.fail,
      payload: response[1],
    });
  }
};

const submitBulkRamadanTimingsAction = (json) => async (dispatch) => {
  dispatch({ type: SUBMIT_BULK_TIMINGS.request });
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_TYPE}${API.RAMADAN_TIMINGS.BULK_UPLOAD}`,
    json,
    token
  );
  if (response[0] === true) {
    dispatch({ type: SUBMIT_BULK_TIMINGS.success, payload: response[1].data });
  } else {
    dispatch({
      type: SUBMIT_BULK_TIMINGS.fail,
      payload: response[1],
    });
  }
};

const clearRamadanErrorsAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_RAMADAN_ERRORS,
  });
};

const resetRamadanAction = () => (dispatch) => {
  dispatch({ type: RESET_RAMADAN_STATE });
};

export default {
  getMosqueRamadanTimingsAction,
  submitBulkRamadanTimingsAction,
  clearRamadanErrorsAction,
  resetRamadanAction,
};
