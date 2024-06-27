import React, { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '~react-web-ui-shadcn/components/ui/alert-dialog';
import { Button } from '~react-web-ui-shadcn/components/ui/button';

import SuccessIcon from '../icons/success';

type ModalSuccessProps = {
  visible: boolean;
  title: string;
  content?: ReactNode;
  btnClose?: string;
  onClose: () => void;
};

const ModalSuccess: FC<ModalSuccessProps> = ({ visible = false, title, content, btnClose, onClose }) => {
  const t = useTranslations();

  return (
    <AlertDialog open={visible}>
      <AlertDialogContent className="flex-col justify-center text-center">
        <SuccessIcon className="mx-auto" width={60} />
        <AlertDialogTitle className="text-green-500">{title}</AlertDialogTitle>
        <AlertDialogDescription>{content}</AlertDialogDescription>
        <Button variant="outline" onClick={onClose}>
          {btnClose ?? t('btn_close')}
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalSuccess;
