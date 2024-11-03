import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// translations
const resources = {
  en: {
    translation: {
      home: {
        welcome: 'Welcome to Masjid-E-Khaasim Moosa Website',
        masjidname: 'Memon Masjid',
      },
      login: {
        login: 'LogIn',
        signup: 'SignUp',
        emailPlaceholder: 'Enter the Email',
        passwordPlaceholder: 'Enter the Password',
        dontHaveAnAccount: "Don't have an account?",
        loginButton: 'Login to Account',
      },
    },
  },

  ar: {
    translation: {
      home: {
        welcome: 'مرحباً بكم في موقع مسجد الخاسم موسى',
        masjidname: 'مسجد ميمون',
      },
      login: {
        login: 'تسجيل الدخول',
        signup: 'اشتراك',
        emailPlaceholder: 'أدخل البريد الإلكتروني',
        passwordPlaceholder: 'أدخل كلمة المرور',
        dontHaveAnAccount: 'ليس لديك حساب؟',
        loginButton: 'تسجيل الدخول إلى الحساب',
      },
    },
  },

  ur: {
    translation: {
      home: {
        welcome: 'مسجد خاسیم موسی کی ویب سائٹ میں خوش آمدید',
        masjidname: 'میمون مسجد',
      },
      login: {
        login: 'لاگ ان',
        signup: 'سائن اپ',
        emailPlaceholder: 'ای میل درج کریں',
        passwordPlaceholder: 'پاس ورڈ درج کریں',
        dontHaveAnAccount: 'اکاؤنٹ نہیں ہے؟',
        loginButton: 'اکاؤنٹ میں لاگ ان کریں',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  debug: true,
  resources,
  lng: 'en',
  fallbackLng: 'en',
  returnObjects: true,
  interpolation: {
    escapeValue: false,
  },
});
