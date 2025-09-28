
'use client';

import { useContext } from 'react';
import { LanguageContext, LanguageContextType } from '@/contexts/language-context';
import i18next from 'i18next';

export const useTranslation = (namespace: string) => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }

  const { language, setLanguage, resources } = context;
  
  i18next.init({
    lng: language,
    resources,
    fallbackLng: 'en',
    ns: [namespace, 'common'],
    defaultNS: namespace,
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

  const t = (key: string, options?: any) => {
    return i18next.t(`${namespace}:${key}`, options) as any;
  }
  
  return { t, language, setLanguage };
};
