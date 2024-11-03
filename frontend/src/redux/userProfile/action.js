import { USER_PROFILE, CLEAR_USER_PROFILE_ERRORS, RESET_USER_PROFILE_STATE } from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';

const getUserProfileAction = () => async (dispatch) => {
  dispatch({ type: USER_PROFILE.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.USERS_PROFILE.USER}${API.USERS_PROFILE.Profile}`,
    token
  );
  if (response[0] === true) {
    dispatch({ type: USER_PROFILE.success, payload: response[1].data });
  } else {
    dispatch({
      type: USER_PROFILE.fail,
      payload: response[1],
    });
  }
};

const clearUserProfileErrorsAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER_PROFILE_ERRORS,
  });
};

const resetUserProfileAction = () => (dispatch) => {
  dispatch({ type: RESET_USER_PROFILE_STATE });
};
export default {
  getUserProfileAction,
  clearUserProfileErrorsAction,
  resetUserProfileAction,
};
