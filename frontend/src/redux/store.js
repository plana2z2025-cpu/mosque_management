import { configureStore } from '@reduxjs/toolkit';
import { LoginReducer } from './login/reducer';
import { UserProfileReducer } from './userProfile/reducer';

const initialState = {};

const reducer = {
  loginState: LoginReducer,
  userProfileState: UserProfileReducer,
};
const store = configureStore({
  reducer,
  preloadedState: initialState,
  //   middleware,
  devTools: true,
  //   import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? false : true,
});

export default store;
