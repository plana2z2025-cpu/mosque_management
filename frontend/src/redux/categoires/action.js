import {
  EVENT_CATEGORIES,
  CLEAR_EVENT_CATEGORIES_ERRORS,
  RESET_EVENT_CATEGORIES_STATE,
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
};
