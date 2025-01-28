import {
  CLEAR_EVENT_ERRORS,
  COMMUNITY_EVENTS,
  RESET_EVENT_STATE,
  EVENT_CATEGORIES,
  EVENT_CATEGORIES_NAMES,
  EVENT_DASHBOARD_GRAPH,
  SINGLE_EVENT_DETAIL
} from './constant';
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

const getEventDetailsAction = (eventId) => async (dispatch) => {
  const token = getAccessToken();
  dispatch({ type: SINGLE_EVENT_DETAIL.request });
  const response = await Service.fetchGet(`${API.BASE_TYPE}/${eventId}`, token);
  if (response[0] === true) {
    dispatch({ type: SINGLE_EVENT_DETAIL.success, payload: response[1].data });
  } else {
    dispatch({ type: SINGLE_EVENT_DETAIL.fail, payload: response[1] });
  }
};

const updateEventAction = async (eventId, json) => {
  const token = getAccessToken();
  const response = await Service.fetchPut(
    `${API.BASE_TYPE}/${eventId}`,
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

const deleteEventAction = async (eventId) => {
  const token = getAccessToken();
  const response = await Service.fetchDelete(`${API.BASE_TYPE}/${eventId}`, token);
  return response;
};

// ----------------------------------------------------------------
// CATEGORIES
// ----------------------------------------------------------------

const getEventCategoriesAction =
  (query = null) =>
    async (dispatch) => {
      dispatch({ type: EVENT_CATEGORIES.request });
      const token = getAccessToken();
      const response = await Service.fetchGet(
        `${API.BASE_TYPE_CATEGORY}${API.EVENT_CATEGORIES_TYPE.CATEGORIES}${query ? '?' + query : ''}`,
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
    `${API.BASE_TYPE_CATEGORY}${API.EVENT_CATEGORIES_TYPE.CREATE_NEW_CATEGORY}`,
    json,
    token
  );

  return response;
};

const updateEventCategoryAction = async (categoryId, json) => {
  const token = getAccessToken();
  const response = await Service.fetchPut(
    `${API.BASE_TYPE_CATEGORY}/${categoryId}`,
    json,
    token
  );
  return response;
};



const getEventAllCategoriesNamesAction = () => async (dispatch) => {
  dispatch({ type: EVENT_CATEGORIES_NAMES.request });
  const token = getAccessToken();
  const response = await Service.fetchGet(
    `${API.BASE_TYPE_CATEGORY}${API.EVENT_CATEGORIES_TYPE.CATEGORIES}${API.EVENT_CATEGORIES_TYPE.ALL}${API.EVENT_CATEGORIES_TYPE.NAMES}`,
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

const deleteCategoryAction = async (categoryId) => {
  const token = getAccessToken();
  const response = await Service.fetchDelete(`${API.BASE_TYPE_CATEGORY}/${categoryId}`, token);
  return response;
};

// ----------------------------------------------------------------
// GRAPHS
// ----------------------------------------------------------------
const eventDashboardGraphAction = () => async (dispatch) => {
  const token = getAccessToken();
  dispatch({ type: EVENT_DASHBOARD_GRAPH.request });
  const response = await Service.fetchGet(
    `${API.BASE_TYPE}${API.EVENT_TYPE.GRAPH}${API.EVENT_TYPE.DASHBOARD}`,
    token
  );

  if (response[0] === true) {
    dispatch({ type: EVENT_DASHBOARD_GRAPH.success, payload: response[1].data });
  } else {
    dispatch({
      type: EVENT_DASHBOARD_GRAPH.fail,
      payload: response[1],
    });
  }
};

// ----------------------------------------------------------------
// CLEAR & RESET STATES
// ----------------------------------------------------------------

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

  // EVENTS
  addNewEventAction,
  getEventDetailsAction,
  updateEventAction,
  getCommunityEventsAction,
  deleteEventAction,

  // CATEGORIES
  getEventCategoriesAction,
  addNewEventCategoryAction,
  updateEventCategoryAction,
  getEventAllCategoriesNamesAction,
  deleteCategoryAction,

  // GRAPHS
  eventDashboardGraphAction,
};
