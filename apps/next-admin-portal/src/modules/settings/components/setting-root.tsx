import React from 'react';
import { usePathname } from 'next/navigation';

import { AppearanceForm } from './appearance/appearance-form';
import AppearanceHeading from './appearance/appearance-heading';

const SettingRoot = () => {
  const pathname = usePathname();

  return (
    <div>
      {pathname.includes('/settings/appearance') && (
        <>
          <AppearanceHeading />
          <AppearanceForm />
        </>
      )}
    </div>
  );
};

export default SettingRoot;
