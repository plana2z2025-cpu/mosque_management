import { GET_RAMADAN_TIMINGS, CLEAR_RAMADAN_ERRORS, RESET_RAMADAN_STATE } from './constant';
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
  clearRamadanErrorsAction,
  resetRamadanAction,
};
