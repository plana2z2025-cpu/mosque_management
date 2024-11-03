import { USER_PROFILE, CLEAR_USER_PROFILE_ERRORS, RESET_USER_PROFILE_STATE } from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  profileDetails: null,
};

export const UserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE.request:
      return {
        ...state,
        loading: true,
      };
    case USER_PROFILE.success:
      return {
        ...state,
        profileDetails: action.payload,
      };
    case USER_PROFILE.fail:
      return {
        ...state,
        loading: false,
        error: action?.payload?.message,
        statusCode: action?.payload?.statusCode || 500,
      };

    // CLEAR && RESET
    case CLEAR_USER_PROFILE_ERRORS:
      return {
        ...state,
        statusCode: null,
        error: null,
      };

    case RESET_USER_PROFILE_STATE:
      return initialState;

    default:
      return state;
  }
};
