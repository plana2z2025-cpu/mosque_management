import {
  CLEAR_MOSQUE_ERRORS,
  COMMUNITY_MOSQUE_DETAILS,
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

const getCommunityMosqueDetailsAction =
  (updateDetails = null) =>
  async (dispatch) => {
    if (updateDetails) {
      dispatch({ type: COMMUNITY_MOSQUE_DETAILS.update, payload: updateDetails });
      return;
    }
    dispatch({ type: COMMUNITY_MOSQUE_DETAILS.request });
    const token = getAccessToken();
    const response = await Service.fetchGet(
      `${API.MOSQUE_TYPES.MOSQUE}${API.MOSQUE_TYPES.COMMUNITY}${API.MOSQUE_TYPES.MOSQUE_DETAIL}`,
      token
    );

    if (response[0] === true) {
      dispatch({ type: COMMUNITY_MOSQUE_DETAILS.success, payload: response[1]?.data });
    } else {
      dispatch({
        type: COMMUNITY_MOSQUE_DETAILS.fail,
        payload: response[1],
      });
    }
  };

const updateMosqueTimingsAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPut(
    `${API.BASE_TYPE}${API.MOSQUE_TYPES.COMMUNITY}${API.MOSQUE_TYPES.MOSQUE_TIMINGS}`,
    json,
    token
  );
  return response;
};

const updateMosqueProfileAction = async (form) => {
  const token = getAccessToken();
  const response = await Service.fetchPut(
    `${API.BASE_TYPE}${API.MOSQUE_TYPES.COMMUNITY}${API.MOSQUE_TYPES.PROFILE}`,
    form,
    token,
    'formData'
  );
  return response;
};

const deleteMosqueGalleryImagesAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPut(
    `${API.BASE_TYPE}${API.MOSQUE_TYPES.COMMUNITY}${API.MOSQUE_TYPES.GALLERY}`,
    json,
    token
  );
  return response;
};

// for settings
const updateMosqueSettingsAction = (json) => async (dispatch, getState) => {
  const token = getAccessToken();
  const { mosqueState } = getState();
  const payload = {
    details: { ...mosqueState?.communityMosqueDetail },
    settings: { ...mosqueState?.communityMosqueSettings, ...json },
  };

  const previousState = {
    details: { ...mosqueState?.communityMosqueDetail },
    settings: { ...mosqueState?.communityMosqueSettings },
  };

  dispatch({ type: COMMUNITY_MOSQUE_DETAILS.update, payload });
  const response = await Service.fetchPut(
    `${API.BASE_TYPE}${API.MOSQUE_TYPES.SETTINGS}${API.MOSQUE_TYPES.COMMUNITY}`,
    json,
    token
  );
  if (response[0] === true) {
    payload.settings = response[1]?.data;
    dispatch({ type: COMMUNITY_MOSQUE_DETAILS.update, payload });
  } else {
    dispatch({ type: COMMUNITY_MOSQUE_DETAILS.update, payload: previousState });
  }
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
  getCommunityMosqueDetailsAction,
  updateMosqueTimingsAction,
  updateMosqueProfileAction,
  deleteMosqueGalleryImagesAction,
  updateMosqueSettingsAction,
};
