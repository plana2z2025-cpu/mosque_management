import { CLEAR_BUILDER_ERRORS, RESET_BUILDER_STATE } from './constant';
import Service from '@/services';
import * as API from './actionTypes';
import { setAccessToken } from '@/helpers/local-storage';
import { setScreenSize, setDragLayout, setTemplateData, setActiveSection } from './reducer';

const setScreenSizeAction = (screenSize) => (dispatch) => {
  dispatch(setScreenSize(screenSize));
};

const setDragLayoutAction = (layout) => (dispatch) => {
  dispatch(setDragLayout(layout || null));
};

const setTemplateDataAction = (template) => (dispatch) => {
  dispatch(setTemplateData(template || []));
};

const setActiveSectionAction = (section) => (dispatch) => {
  dispatch(setActiveSection(section));
};

const clearBuilderErrorsAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_BUILDER_ERRORS,
  });
};

const resetBuilderAction = () => (dispatch) => {
  dispatch({ type: RESET_BUILDER_STATE });
};

export default {
  setScreenSizeAction,
  setDragLayoutAction,
  setTemplateDataAction,
  setActiveSectionAction,
  clearBuilderErrorsAction,
  resetBuilderAction,
};
