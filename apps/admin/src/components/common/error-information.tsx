'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@ui/components/ui/button';

type ErrorInformationType = {
  code?: number;
  title?: string;
  message?: string;
  stack?: string;
  cause?: string;
  onBackClick?: () => void;
};

const ErrorInformation: FC<ErrorInformationType> = ({ code, title, message, stack, cause, onBackClick }) => {
  const t = useTranslations();

  return (
    <section className="relative py-24 md:py-44 lg:pb-72 lg:pt-56" data-testid="error-info">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="md:max-w-4xl">
            <span className="text-primary text-4xl font-bold leading-tight md:text-5xl">
              {t('something_went_wrong')}
            </span>
            <h2 className="my-4 text-2xl font-bold leading-tight tracking-tighter md:text-3xl">{code}</h2>
            <p className="mb-6 text-lg text-gray-400 md:text-xl">{title}</p>
            <p>{message}</p>
            <code className="mb-6 text-sm text-gray-400 md:text-xl">
              <pre>{stack}</pre>
              <pre>{cause}</pre>
            </code>
            <div className="flex flex-wrap space-x-2">
              <Button onClick={onBackClick}>{t('back_to_home')}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorInformation;
