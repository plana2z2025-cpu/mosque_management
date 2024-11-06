import { CLEAR_MOSQUE_ERRORS, RESET_MOSQUE_STATE, SUPPER_ADMIN_MOSQUES } from './constant';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  supperAdminMosques: null,
};
export const MosqueReducer = (state = initialState, action) => {
  const actionHandlers = {
    [SUPPER_ADMIN_MOSQUES.request]: () => ({
      ...state,
      loading: true,
    }),
    [SUPPER_ADMIN_MOSQUES.success]: () => ({
      ...state,
      loading: false,
      supperAdminMosques: action.payload,
    }),
    [SUPPER_ADMIN_MOSQUES.fail]: () => ({
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
