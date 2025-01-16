import {
  CLEAR_MOSQUE_ERRORS,
  COMMUNITY_MOSQUE_DETAILS,
  RESET_MOSQUE_STATE,
  SUPPER_ADMIN_MOSQUES,
  SUPPER_ADMIN_SINGLE_MOSQUE,
} from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  supperAdminMosques: null,
  supperAdminSingleMosque: null,
  communityMosqueDetail: null,
};
export const MosqueReducer = (state = initialState, action) => {
  const actionHandlers = {
    // Loading states
    [SUPPER_ADMIN_MOSQUES.request]: () => ({
      ...state,
      loading: true,
    }),
    [SUPPER_ADMIN_SINGLE_MOSQUE.request]: () => ({
      ...state,
      loading: true,
    }),
    [COMMUNITY_MOSQUE_DETAILS.request]: () => ({
      ...state,
      loading: true,
    }),

    // Success states
    [SUPPER_ADMIN_MOSQUES.success]: () => ({
      ...state,
      loading: false,
      supperAdminMosques: action.payload,
    }),
    [SUPPER_ADMIN_SINGLE_MOSQUE.success]: () => ({
      ...state,
      loading: false,
      supperAdminSingleMosque: action.payload,
    }),
    [COMMUNITY_MOSQUE_DETAILS.success]: () => ({
      ...state,
      loading: false,
      communityMosqueDetail: action.payload,
    }),

    // Failure states
    [SUPPER_ADMIN_MOSQUES.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'An error occurred',
      statusCode: action?.payload?.statusCode || 500,
    }),
    [SUPPER_ADMIN_SINGLE_MOSQUE.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'An error occurred',
      statusCode: action?.payload?.statusCode || 500,
    }),
    [COMMUNITY_MOSQUE_DETAILS.fail]: () => ({
      ...state,
      loading: false,
      error: action?.payload?.message || 'An error occurred',
      statusCode: action?.payload?.statusCode || 500,
    }),

    // Errors, Reset, Default
    [CLEAR_MOSQUE_ERRORS]: () => ({
      ...state,
      statusCode: null,
      error: null,
    }),

    [RESET_MOSQUE_STATE]: () => initialState,
  };

  const handler = actionHandlers[action.type];
  return handler ? handler() : state;
};
