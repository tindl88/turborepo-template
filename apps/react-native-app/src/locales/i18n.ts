import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEN from '@/locales/en-us.json';
import commonVI from '@/locales/vi-vn.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: { common: commonEN },
    vi: { common: commonVI }
  },
  initImmediate: false
});
