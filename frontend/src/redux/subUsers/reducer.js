import {
  ADMINISTRATORS,
  CLEAR_ADMINISTRATORS_ERRORS,
  RESET_ADMINISTRATORS_STATE,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  administrators: null,
};

export const AdministratorReducer = (state = initialState, action) => {
  const actionHandlers = {
    [ADMINISTRATORS.request]: () => ({
      ...state,
      loading: true,
    }),
    [ADMINISTRATORS.success]: () => ({
      ...state,
      loading: false,
      administrators: action.payload,
    }),
    [ADMINISTRATORS.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),

    // errors,reset,default
    [CLEAR_ADMINISTRATORS_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),
    [RESET_ADMINISTRATORS_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
