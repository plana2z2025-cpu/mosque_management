import LoginActions from './login/action';
import UserActions from './userProfile/action';
import MosqueAction from './mosques/action';
import AdministratorAction from './subUsers/action';
import EventAction from './events/action';

export const loginActions = { ...LoginActions };
export const userActions = { ...UserActions };
export const mosqueActions = { ...MosqueAction };
export const administratorActions = { ...AdministratorAction };
export const eventActions = { ...EventAction };

// after adding reset the action in to the logout hook
