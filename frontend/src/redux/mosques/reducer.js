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
    [SUPPER_ADMIN_MOSQUES.request ||
    SUPPER_ADMIN_SINGLE_MOSQUE.request ||
    COMMUNITY_MOSQUE_DETAILS.request]: () => ({
      ...state,
      loading: true,
    }),
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

    [SUPPER_ADMIN_MOSQUES.fail || SUPPER_ADMIN_SINGLE_MOSQUE.fail || COMMUNITY_MOSQUE_DETAILS.fail]:
      () => ({
        ...state,
        loading: false,
        error: action?.payload?.message,
        statusCode: action?.payload?.statusCode || 500,
      }),

    // errors,reset,default
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
