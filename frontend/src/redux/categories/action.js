import {
  EVENT_CATEGORIES,
  CLEAR_EVENT_CATEGORIES_ERRORS,
  RESET_EVENT_CATEGORIES_STATE,
  EVENT_CATEGORIES_NAMES,
} from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';

const getEventCategoriesAction =
  (query = null) =>
  async (dispatch) => {
    dispatch({ type: EVENT_CATEGORIES.request });
    const token = getAccessToken();
    const response = await Service.fetchGet(
      `${API.BASE_TYPE}${API.EVENT_CATEGORIES_TYPE.CATEGORIES}${query ? '?' + query : ''}`,
      token
    );

    if (response[0] === true) {
      dispatch({ type: EVENT_CATEGORIES.success, payload: response[1].data });
    } else {
      dispatch({
        type: EVENT_CATEGORIES.fail,
        payload: response[1],
      });
    }
  };

const addNewEventCategoryAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_TYPE}${API.EVENT_CATEGORIES_TYPE.CREATE_NEW_CATEGORY}`,
    json,
    token
  );

  return response;
};

const getEventAllCategoriesNamesAction = () => async (dispatch) => {
  dispatch({ type: EVENT_CATEGORIES_NAMES.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_TYPE}${API.EVENT_CATEGORIES_TYPE.CATEGORIES}${API.EVENT_CATEGORIES_TYPE.ALL}${API.EVENT_CATEGORIES_TYPE.NAMES}`,
    token
  );

  if (response[0] === true) {
    dispatch({ type: EVENT_CATEGORIES_NAMES.success, payload: response[1].data });
  } else {
    dispatch({
      type: EVENT_CATEGORIES_NAMES.fail,
      payload: response[1],
    });
  }
};

const clearEventCategoriesAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_EVENT_CATEGORIES_ERRORS,
  });
};

const resetEventCategoriesAction = () => (dispatch) => {
  dispatch({ type: RESET_EVENT_CATEGORIES_STATE });
};

export default {
  clearEventCategoriesAction,
  resetEventCategoriesAction,
  getEventCategoriesAction,
  addNewEventCategoryAction,
  getEventAllCategoriesNamesAction,
};
