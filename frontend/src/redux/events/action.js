import { CLEAR_EVENT_ERRORS, COMMUNITY_EVENTS, RESET_EVENT_STATE } from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { getAccessToken } from '@/helpers/local-storage';

const addNewEventAction = async (json) => {
  const token = getAccessToken();
  const response = await Service.fetchPost(
    `${API.BASE_TYPE}${API.EVENT_TYPE.CREATE_NEW_EVENT}`,
    json,
    token
  );

  return response;
};

const getCommunityEventsAction =
  (query = null) =>
  async (dispatch) => {
    dispatch({ type: COMMUNITY_EVENTS.request });
    const token = getAccessToken();
    const response = await Service.fetchGet(
      `${API.BASE_TYPE}${API.EVENT_TYPE.EVENTS}${query ? '?' + query : ''}`,
      token
    );

    if (response[0] === true) {
      dispatch({ type: COMMUNITY_EVENTS.success, payload: response[1].data });
    } else {
      dispatch({
        type: COMMUNITY_EVENTS.fail,
        payload: response[1],
      });
    }
  };

const clearEventAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_EVENT_ERRORS,
  });
};

const resetEventAction = () => (dispatch) => {
  dispatch({ type: RESET_EVENT_STATE });
};

export default {
  clearEventAction,
  resetEventAction,
  addNewEventAction,
  getCommunityEventsAction,
};
