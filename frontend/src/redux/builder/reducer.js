import { CLEAR_BUILDER_ERRORS, RESET_BUILDER_STATE } from './constant';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  screenSize: 'desktop',
  dragLayout: null,
  templateSections: [],
};

export const builderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_BUILDER_ERRORS:
      return {
        ...state,
        error: null,
      };
    case RESET_BUILDER_STATE:
      return initialState;
    default:
      return state;
  }
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
    setDragLayout: (state, action) => {
      state.dragLayout = action.payload;
    },
    setTemplateData: (state, action) => {
      state.templateSections = action.payload;
    },
  },
});

export const { setScreenSize, setDragLayout, setTemplateData } = builderSlice.actions;
export const builderReducerToolkit = builderSlice.reducer;
