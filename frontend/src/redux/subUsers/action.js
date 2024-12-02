import {
  ADMINISTRATORS,
  CLEAR_ADMINISTRATORS_ERRORS,
  RESET_ADMINISTRATORS_STATE,
} from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';

const getAdministratorsAction =
  (query = null) =>
  async (dispatch) => {
    dispatch({ type: ADMINISTRATORS.request });
    const token = getAccessToken();
    const response = await Service.fetchGet(
      `${API.BASE_TYPE}${API.SUB_USERS_TYPE.USERS}${query ? '?' + query : null}`,
      token
    );

    if (response[0] === true) {
      dispatch({ type: ADMINISTRATORS.success, payload: response[1]?.data });
    } else {
      dispatch({
        type: ADMINISTRATORS.fail,
        payload: response[1],
      });
    }
  };

const clearAdministratorsAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_ADMINISTRATORS_ERRORS,
  });
};

const resetAdministratorsAction = () => (dispatch) => {
  dispatch({ type: RESET_ADMINISTRATORS_STATE });
};

export default {
  clearAdministratorsAction,
  resetAdministratorsAction,
  getAdministratorsAction,
};
