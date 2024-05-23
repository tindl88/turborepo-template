import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SearchIcon } from 'lucide-react';
import { Button } from '~ui/components/ui/button';
import { Input } from '~ui/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type SearchBoxProps = {
  value?: string;
  onKeywordChange?: (text: string) => void;
  onSearch?: (text: string) => void;
} & ComponentBaseProps;

function SearchBox({ value = '', onKeywordChange, onSearch }: SearchBoxProps) {
  const t = useTranslations();
  const [val, setVal] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
    onKeywordChange?.(event.target.value);
  };

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div className="input-group flex items-center gap-x-1">
      <Input
        className="w-48 pr-10"
        placeholder={t('keyword') + '...'}
        value={val}
        onChange={handleChange}
        onKeyUp={event => {
          if (event.key === 'Enter') onSearch?.(val);
        }}
      />
      <Button className="-ml-10 h-9 rounded-l-none rounded-r-sm p-2" variant="ghost" onClick={() => onSearch?.(val)}>
        <SearchIcon size={18} />
      </Button>
    </div>
  );
}

export default SearchBox;
