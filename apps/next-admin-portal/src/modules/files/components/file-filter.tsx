import React, { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { SearchIcon } from 'lucide-react';
import { Button } from '~ui/components/ui/button';
import { Input } from '~ui/components/ui/input';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { useFilesState } from '../states/files.state';

type FileFilterProps = {
  onSearch?: (value: string) => void;
  onResetFilter?: () => void;
} & ComponentBaseProps;

const FileFilter: FC<FileFilterProps> = ({ className, onSearch, onResetFilter }) => {
  const t = useTranslations();
  const filesState = useFilesState();
  const [keyword, setKeyword] = useState('');

  const { filter } = filesState;

  useEffect(() => {
    setKeyword(filter?.q || '');
  }, [filter?.q]);

  return (
    <div className={classNames('flex items-center space-x-2', className)}>
      <div className="flex items-center">
        <Input
          placeholder={t('keyword') + '...'}
          value={keyword}
          className="w-48 pr-10"
          onChange={event => setKeyword(event.target.value)}
          onKeyUp={event => {
            if (event.key === 'Enter') onSearch?.(keyword);
          }}
        />
        <Button className="-ml-9 h-8 p-2" variant="ghost" onClick={() => onSearch?.(keyword)}>
          <SearchIcon size={18} />
        </Button>
      </div>
      <Button variant="outline" onClick={onResetFilter}>
        {t('filter_reset')}
      </Button>
    </div>
  );
};

export default FileFilter;
