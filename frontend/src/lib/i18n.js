import i18n from 'i18next';
import englishScript from '../assets/translations/english';
import arabicScript from '../assets/translations/arabic';
import urduScript from '../assets/translations/urdu';

import { initReactI18next } from 'react-i18next';

// translations
const resources = {
  en: {
    translation: englishScript,
  },

  ar: {
    translation: arabicScript,
  },

  ur: {
    translation: urduScript,
  },
};

i18n.use(initReactI18next).init({
  debug: false,
  resources,
  lng: 'en',
  fallbackLng: 'en',
  returnObjects: true,
  interpolation: {
    escapeValue: false,
  },
});
