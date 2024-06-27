import React, { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '~ui/components/ui/alert-dialog';
import { Button } from '~ui/components/ui/button';

import ErrorIcon from '../icons/error';

type ModalErrorProps = {
  visible: boolean;
  title: string;
  content?: ReactNode;
  btnClose?: string;
  onClose: () => void;
};

const ModalError: FC<ModalErrorProps> = ({ visible = false, title, content, btnClose, onClose }) => {
  const t = useTranslations();

  return (
    <AlertDialog open={visible}>
      <AlertDialogContent className="flex-col justify-center text-center">
        <ErrorIcon className="mx-auto" width={60} />
        <AlertDialogTitle className="text-red-500">{title}</AlertDialogTitle>
        <AlertDialogDescription>{content}</AlertDialogDescription>
        <Button variant="outline" onClick={onClose}>
          {btnClose ?? t('btn_close')}
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalError;
