import LoginActions from './login/action';
import UserActions from './userProfile/action';
import MosqueAction from './mosques/action';

export const loginActions = { ...LoginActions };
export const userActions = { ...UserActions };
export const mosqueActions = { ...MosqueAction };
