import { USER_LOGIN, CLEAR_LOGIN_ERRORS, RESET_LOGIN_STATE } from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  isLoginSuccess: null,
  role: null,
};

export const LoginReducer = (state = initialState, action) => {
  const actionHandlers = {
    [USER_LOGIN.request]: () => ({
      ...state,
      loading: true,
    }),
    [USER_LOGIN.success]: () => ({
      ...state,
      isLoginSuccess: true,
      role: action.payload,
    }),

    // errors,reset,default
    [USER_LOGIN.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),
    [CLEAR_LOGIN_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),
    [RESET_LOGIN_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
