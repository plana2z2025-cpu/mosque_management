import { configureStore } from '@reduxjs/toolkit';
import { LoginReducer } from './login/reducer';
import { UserProfileReducer } from './userProfile/reducer';
import { MosqueReducer } from './mosques/reducer';
import { AdministratorReducer } from './subUsers/reducer';
import { EventReducer } from './events/reducer';
import { ExpenseReducer } from './expenses/reducer';
import { PaymentsReducer } from './payments/reducer';
import { RamadaReducer } from './ramadan/reducer';

const initialState = {};

const reducer = {
  loginState: LoginReducer,
  userProfileState: UserProfileReducer,
  mosqueState: MosqueReducer,
  administratorState: AdministratorReducer,
  eventState: EventReducer,
  expenseState: ExpenseReducer,
  payeeState: PaymentsReducer,
  ramadanState: RamadaReducer,
};
const store = configureStore({
  reducer,
  preloadedState: initialState,
  //   middleware,
  devTools: true,
  //   import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? false : true,
});

export default store;
