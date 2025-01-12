import {
    CLEAR_PAYEE_ERRORS,
    RESET_PAYEE_STATE,
    PAYEE,
    // EXPENSE_CATEGORIES,
    // EXPENSE_CATEGORIES_NAMES,
  } from './constant';
  import Service from '@/services';
  import * as API from './actionTypes';
  import { getAccessToken } from '@/helpers/local-storage';
  
  const addNewPayeeAction = async (json) => {
    const token = getAccessToken();
    const response = await Service.fetchPost(
      `/expenses/payee/create-new-payee`,
      json,
      token
    );
  
    return response;
  };
  
  const getAllPayeeAction =
    (query = null) =>
    async (dispatch) => {
      dispatch({ type: PAYEE.request });
      const token = getAccessToken();
      const response = await Service.fetchGet(
        `${API.BASE_PAYEE}${API.PAYEES}${query ? '?' + query : ''}`,
        token
      );
  
      if (response[0] === true) {
        dispatch({ type: PAYEE.success, payload: response[1].data });
      } else {
        dispatch({
          type: PAYEE.fail,
          payload: response[1],
        });
      }
    };
  
  // ----------------------------------------------------------------
  // CATEGORIES
  // ----------------------------------------------------------------
  
  // const getExpenseCategoriesAction =
  //   (query = null) =>
  //   async (dispatch) => {
  //     dispatch({ type: EXPENSE_CATEGORIES.request });
  //     const token = getAccessToken();
  //     const response = await Service.fetchGet(
  //       `${API.BASE_TYPE_CATEGORY}${API.EXPENSE_CATEGORIES_TYPE.CATEGORIES}${query ? '?' + query : ''}`,
  //       token
  //     );
  
  //     if (response[0] === true) {
  //       dispatch({ type: EXPENSE_CATEGORIES.success, payload: response[1].data });
  //     } else {
  //       dispatch({
  //         type: EXPENSE_CATEGORIES.fail,
  //         payload: response[1],
  //       });
  //     }
  //   };
  
  // const addNewExpenseCategoryAction = async (json) => {
  //   const token = getAccessToken();
  //   const response = await Service.fetchPost(
  //     `${API.BASE_TYPE_CATEGORY}${API.EXPENSE_CATEGORIES_TYPE.CREATE_NEW_CATEGORY}`,
  //     json,
  //     token
  //   );
  
  //   return response;
  // };
  
  // const getAllExpenseCategoryNamesAction = () => async (dispatch) => {
  //   dispatch({ type: EXPENSE_CATEGORIES_NAMES.request });
  //   const token = getAccessToken();
  //   const response = await Service.fetchGet(
  //     `${API.BASE_TYPE_CATEGORY}${API.EXPENSE_CATEGORIES_TYPE.CATEGORIES}${API.EXPENSE_CATEGORIES_TYPE.ALL}${API.EXPENSE_CATEGORIES_TYPE.NAMES}`,
  //     token
  //   );
  
  //   if (response[0] === true) {
  //     dispatch({ type: EXPENSE_CATEGORIES_NAMES.success, payload: response[1].data });
  //   } else {
  //     dispatch({
  //       type: EXPENSE_CATEGORIES_NAMES.fail,
  //       payload: response[1],
  //     });
  //   }
  // };
  
  const deletePayeeAction = async (payeeId) => {
    const token = getAccessToken();
    const response = await Service.fetchDelete(`${API.BASE_PAYEE}/${payeeId}`, token);
    return response;
  };
  
  // ----------------------------------------------------------------
  // CLEAR & RESET STATES
  // ----------------------------------------------------------------
  
  const clearPayeeAction = () => (dispatch) => {
    dispatch({
      type: CLEAR_PAYEE_ERRORS,
    });
  };
  
  const resetPayeeAction = () => (dispatch) => {
    dispatch({ type: RESET_PAYEE_STATE });
  };
  
  export default {
    clearPayeeAction ,
    resetPayeeAction,
  
    // EXPENSES
    addNewPayeeAction,
    getAllPayeeAction,
  
    // CATEGORIES
    // getExpenseCategoriesAction,
    // addNewExpenseCategoryAction,
    // getAllExpenseCategoryNamesAction,
    deletePayeeAction,
  };
  