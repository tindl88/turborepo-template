import React, { FC, ReactNode, useEffect, useState } from 'react';
import { IntlProvider } from 'use-intl';

import { useLanguageState } from '@/modules/language/states/language.state';

// Import your local JSON files
import enMessages from '@/locales/en-us.json';
import viMessages from '@/locales/vi-vn.json';

type AllTheProvidersProps = {
  children?: ReactNode;
};

// Function to get messages based on the language
const getMessages = (language: string) => {
  switch (language) {
    case 'vi-vn':
      return viMessages;
    case 'en-us':
    default:
      return enMessages;
  }
};

const AllTheProviders: FC<AllTheProvidersProps> = ({ children }) => {
  const { language } = useLanguageState();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const loadMessages = () => {
      const selectedMessages = getMessages(language.key);

      setMessages(selectedMessages);
    };

    loadMessages();
  }, [language]);

  return (
    <IntlProvider messages={messages} locale={language.key}>
      {children}
    </IntlProvider>
  );
};

export default AllTheProviders;
