import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { CheckIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@ui/components/ui/command';

import { StatusType } from '@/interfaces/status.interface';

interface IPostFilterStatusProps {
  title?: string;
  value: string[];
  options: StatusType[];
  onChange?: (values: string[]) => void;
  onClose?: () => void;
}

export default function PostFilterStatus({ title, value = [], options, onChange, onClose }: IPostFilterStatusProps) {
  const t = useTranslations();
  const [selectedItems, setSelectedItems] = useState(value);

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    onChange?.(selectedItems);
  }, [selectedItems]);

  return (
    <Command>
      <CommandInput placeholder={title} />
      <CommandList className="scrollbar">
        <CommandEmpty>{t('no_results_found')}</CommandEmpty>
        <CommandGroup>
          {options.map(option => {
            return (
              <CommandItem key={option.value} onSelect={() => toggleItem(option.value)}>
                <div
                  className={classNames(
                    'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                    selectedItems.includes(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )}
                >
                  <CheckIcon className={classNames('h-4 w-4')} />
                </div>
                {option.icon && <option.icon className={classNames('mr-2 h-4 w-4', option.iconClassName)} />}
                <span>{option.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        {selectedItems.length > 0 && (
          <>
            <CommandSeparator className="mx-0" />
            <CommandGroup>
              <CommandItem className="justify-center text-center" onSelect={() => setSelectedItems([])}>
                {t('filter_clear')}
              </CommandItem>
            </CommandGroup>
          </>
        )}
        <CommandGroup>
          <Button className="w-full" onClick={onClose}>
            {t('close')}
          </Button>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
