import { clearAll } from '@/helpers/local-storage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  loginActions,
  userActions,
  mosqueActions,
  administratorActions,
  eventActions,
  payeeActions,
  ramadanActions,
} from '@/redux/combineActions';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetApplications = useCallback(async () => {
    //add here all reset context state func

    dispatch(loginActions.resetLoginAction());
    dispatch(userActions.resetUserProfileAction());
    dispatch(mosqueActions.resetMosqueAction());
    dispatch(administratorActions.resetAdministratorsAction());
    dispatch(eventActions.resetEventAction());
    dispatch(payeeActions.resetPayeeAction());
    dispatch(ramadanActions.resetRamadanAction());
    navigate('/');
    clearAll();
  }, []);

  return resetApplications;
};

export default useLogout;
