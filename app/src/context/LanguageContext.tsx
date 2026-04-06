import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Language, LanguageDirection } from '@/types';
import { languageDirection } from '@/types';

interface LanguageContextType {
  currentLanguage: Language;
  direction: LanguageDirection;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { translations } from '@/lib/translations';

const SUPPORTED_LANGUAGES: Language[] = ['en', 'fr', 'ar', 'tr', 'it'];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [direction, setDirection] = useState<LanguageDirection>('ltr');

  useEffect(() => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
      setCurrentLanguage(savedLang);
      setDirection(languageDirection[savedLang]);
      document.documentElement.dir = languageDirection[savedLang];
      document.documentElement.lang = savedLang;
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    setDirection(languageDirection[lang]);
    document.documentElement.dir = languageDirection[lang];
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
  }, []);

  const t = useCallback((key: string): any => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
