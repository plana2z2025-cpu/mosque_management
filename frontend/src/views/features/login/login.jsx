import React, { useState, memo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SideImage from '../../../assets/images/loginside.jpg';
import LoginComp from '@/views/components2/login/LoginComp';
import SignupComp from '@/views/components2/login/SignupComp';
import Welcome from '@/views/components2/home/Welcome';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '@/redux/combineActions';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ADMIN, SUPPER_ADMIN } from '@/constants/roles.constants';

const Login = () => {
  const { loading, error, isLoginSuccess, role } = useSelector((state) => state.loginState);
  const { profileDetails } = useSelector((state) => state.userProfileState);

  const dispatch = useDispatch();
  const { loginUserAction, clearLoginErrorsAction, resetLoginAction } = loginActions;
  const navigate = useNavigate();
  const checkAuth = useAuth();

  const [info, setinfo] = useState({
    email: '',
    password: '',
    isLoginForm: true,
  });

  useGSAP(() => {
    gsap.from('.login-container', {
      scale: 0,
      duration: 1,
    });
    gsap.from('.sideimage', {
      scale: 0,
      duration: 1,
    });
  }, [info?.isLoginForm]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearLoginErrorsAction());
    }

    if (isLoginSuccess) {
      dispatch(resetLoginAction());
      if (role === SUPPER_ADMIN) navigate('/superadmin/mosques');
      else if (role === ADMIN) navigate('/admin/dashboard/analytics');
    }
  }, [error, isLoginSuccess]);

  // useEffect(() => {
  //   if (checkAuth()) {
  //     console.log(checkAuth());
  //     // navigate('/test');
  //   }
  // }, []);

  const toggleForm = () => {
    setinfo((prev) => ({
      ...prev,
      isLoginForm: !prev.isLoginForm,
    }));
  };

  const changeHandlerFunction = (e) => {
    const { name, value } = e.target;
    setinfo((prev) => ({ ...prev, [name]: value }));
  };

  const loginSubmitHandlerFunction = () => {
    if (!validator.isEmail(info.email || '')) {
      toast.error('Enter the correct email');
      return;
    } else if (!validator.isStrongPassword(info.password || '')) {
      toast.error('Enter the strong password');
      return;
    }

    const json = {
      email: info?.email || '',
      password: info?.password || '',
    };
    dispatch(loginUserAction(json));
  };

  return (
    <>
      <div className="fullScreen">
        {/* <div className="w-full">
          <Welcome />
        </div> */}

        <div
          className="flex items-center justify-center gap-4 "
          style={{ height: 'calc(100vh - 4rem)' }}
        >
          <div className="login-container w-full max-w-6xl flex">
            {/* Left Side - Forms */}
            <div className="w-1/2 perspective-1000">
              {info?.isLoginForm ? (
                <LoginComp
                  toggleForm={toggleForm}
                  loginSubmitHandlerFunction={loginSubmitHandlerFunction}
                  changeHandlerFunction={changeHandlerFunction}
                  loading={loading}
                />
              ) : (
                <SignupComp toggleForm={toggleForm} />
              )}
            </div>

            {/* Right Side - SVG */}
            <div className="w-1/2">
              <img src={SideImage} alt="sideimage" className="sideimage w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Login);
