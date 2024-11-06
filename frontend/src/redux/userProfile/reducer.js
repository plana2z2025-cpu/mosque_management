import { USER_PROFILE, CLEAR_USER_PROFILE_ERRORS, RESET_USER_PROFILE_STATE } from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  profileDetails: null,
};

export const UserProfileReducer = (state = initialState, action) => {
  const actionHandlers = {
    [USER_PROFILE.request]: () => ({
      ...state,
      loading: true,
    }),
    [USER_PROFILE.success]: () => ({
      ...state,
      profileDetails: action.payload,
    }),
    [USER_PROFILE.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message,
      statusCode: action?.payload?.statusCode || 500,
    }),
    [CLEAR_USER_PROFILE_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),
    [RESET_USER_PROFILE_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
