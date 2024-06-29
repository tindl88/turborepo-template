import { useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IntlProvider } from 'use-intl';

import enMessages from '@/locales/en-us.json';
import viMessages from '@/locales/vi-vn.json';
import { LanguageContext } from '../contexts/languages.context';

const getMessages = (language: string) => {
  switch (language) {
    case 'vi-vn':
      return viMessages;
    case 'en-us':
    default:
      return enMessages;
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<string>(() => localStorage.getItem('locale') || 'en-us');
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Record<string, string>>({});

  const changeLanguage = (language: string) => {
    setLocale(language);

    const currentPath = location.pathname;
    const newPath = currentPath.replace(/^\/[^/]+/, `/${language}`);

    navigate(newPath);
  };

  useEffect(() => {
    const loadMessages = () => {
      const selectedMessages = getMessages(locale);
      setMessages(selectedMessages);
    };

    loadMessages();

    localStorage.setItem('locale', locale);
  }, [locale]);

  if (Object.keys(messages).length === 0) return null;

  return (
    <LanguageContext.Provider value={{ language: locale, changeLanguage }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
