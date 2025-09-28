
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import en from '@/lib/locales/en.json';
import ml from '@/lib/locales/ml.json';

export type Language = 'en' | 'ml';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  resources: any;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const resources = {
  en,
  ml,
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && ['en', 'ml'].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, resources }}>
      {children}
    </LanguageContext.Provider>
  );
};
