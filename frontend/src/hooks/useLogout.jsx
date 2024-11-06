import { clearAll } from '@/helpers/local-storage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginActions, userActions, mosqueActions } from '@/redux/combineActions';

const useLogout = () => {
  const navigate = useNavigate();

  const resetApplications = useCallback(async () => {
    //add here all reset context state func
    loginActions.resetLoginAction();
    userActions.resetUserProfileAction();
    mosqueActions.resetMosqueAction();
    navigate('/');
    clearAll();
  }, []);

  return resetApplications;
};

export default useLogout;
