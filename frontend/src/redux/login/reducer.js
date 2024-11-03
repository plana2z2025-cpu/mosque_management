import { USER_LOGIN, CLEAR_LOGIN_ERRORS, RESET_LOGIN_STATE } from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  isLoginSuccess: null,
};
export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN.request:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN.success:
      return {
        ...state,
        isLoginSuccess: true,
      };
    case USER_LOGIN.fail:
      return {
        ...state,
        loading: false,
        error: action?.payload?.message,
        statusCode: action?.payload?.statusCode || 500,
      };

    // CLEAR && RESET
    case CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        statusCode: null,
        error: null,
      };

    case RESET_LOGIN_STATE:
      return initialState;

    default:
      return state;
  }
};
