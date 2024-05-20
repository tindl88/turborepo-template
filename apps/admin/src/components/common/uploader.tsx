import React, { ChangeEvent, ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { Button } from '@ui/components/ui/button';
import { Loading } from '@ui/components/ui/loading';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type UploaderProps = {
  trigger?: ReactNode;
  loading?: boolean;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  maxFileSize?: number;
  onChange: (files: FileList) => void;
} & ComponentBaseProps;

const Uploader: React.FC<UploaderProps> = ({
  className,
  loading = false,
  multiple = true,
  trigger = 'Upload',
  maxFiles = 10,
  accept = undefined,
  onChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length) onChange(files);
  };

  const renderTrigger = () => {
    return (
      <Button className="flex items-center space-x-2" onClick={() => fileInputRef.current?.click()}>
        {loading && <Loading size="icon" thickness={2} />}
        <div>{trigger}</div>
      </Button>
    );
  };

  return (
    <div className={classNames(className)}>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        multiple={multiple}
        accept={accept}
        max={maxFiles}
        onChange={handleInputChange}
      />
      {renderTrigger()}
    </div>
  );
};

Uploader.displayName = 'Uploader';

export default Uploader;
