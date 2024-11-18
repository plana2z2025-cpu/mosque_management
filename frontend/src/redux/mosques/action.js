import {
  CLEAR_MOSQUE_ERRORS,
  RESET_MOSQUE_STATE,
  SUPPER_ADMIN_MOSQUES,
  SUPPER_ADMIN_SINGLE_MOSQUE,
} from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';

const getSuperAdminMosqueAction =
  (query = null) =>
  async (dispatch) => {
    dispatch({ type: SUPPER_ADMIN_MOSQUES.request });
    const token = getAccessToken();
    const response = await Service.fetchGet(
      `${API.MOSQUE_TYPES.MOSQUE}${API.MOSQUE_TYPES.MOSQUES}${query ? '?' + query : null}`,
      token
    );

    if (response[0] === true) {
      dispatch({ type: SUPPER_ADMIN_MOSQUES.success, payload: response[1]?.data });
    } else {
      dispatch({
        type: SUPPER_ADMIN_MOSQUES.fail,
        payload: response[1],
      });
    }
  };

const getSuperAdminSingleMosqueAction = (slug) => async (dispatch) => {
  dispatch({ type: SUPPER_ADMIN_SINGLE_MOSQUE.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.MOSQUE_TYPES.MOSQUE}${API.MOSQUE_TYPES.MOSQUES}/${slug}`,
    token
  );

  if (response[0] === true) {
    dispatch({ type: SUPPER_ADMIN_SINGLE_MOSQUE.success, payload: response[1]?.data });
  } else {
    dispatch({
      type: SUPPER_ADMIN_SINGLE_MOSQUE.fail,
      payload: response[1],
    });
  }
};

const checkEmailAvailabilityAction = async (json) => {
  const response = await Service.fetchPost(
    `${API.MOSQUE_TYPES.MOSQUE}${API.MOSQUE_TYPES.CREATE_MOSQUE}${API.MOSQUE_TYPES.EMAIL_VERIFY}`,
    json
  );
  return response;
};

const checkSlugAvailabilityAction = async (json) => {
  const response = await Service.fetchPost(
    `${API.MOSQUE_TYPES.MOSQUE}${API.MOSQUE_TYPES.CREATE_MOSQUE}${API.MOSQUE_TYPES.SLUG_VERIFY}`,
    json
  );
  return response;
};

const registerMosqueAction = async (json) => {
  const response = await Service.fetchPost(
    `${API.MOSQUE_TYPES.MOSQUE}${API.MOSQUE_TYPES.CREATE_MOSQUE}`,
    json
  );
  return response;
};

const clearMosqueErrorsAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_MOSQUE_ERRORS,
  });
};

const resetMosqueAction = () => (dispatch) => {
  dispatch({ type: RESET_MOSQUE_STATE });
};
export default {
  getSuperAdminMosqueAction,
  getSuperAdminSingleMosqueAction,
  checkEmailAvailabilityAction,
  checkSlugAvailabilityAction,
  registerMosqueAction,
  resetMosqueAction,
  clearMosqueErrorsAction,
};
