import { clearAll } from '@/helpers/local-storage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();
  // let {
  // 	chatInfo: { resetChatState },
  // 	companyInfo: { resetCompanySettings },
  // 	profileInfo: { resetProfileSettingsState },
  // 	templates: { resetTemplateState },
  // 	galleryInfo: { resetGallleryState },
  // } = useContext(Context);

  const resetApplications = useCallback(async () => {
    navigate('/');
    clearAll();

    //add here all reset context state func
    // resetCompanySettings();
  }, []);

  return resetApplications;
};

export default useLogout;
