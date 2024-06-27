import React, { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '~ui/components/ui/alert-dialog';

type ModalConfirmProps = {
  visible: boolean;
  title: string;
  content?: ReactNode;
  btnYes?: string;
  btnNo?: string;
  onYes: () => void;
  onNo: () => void;
};

const ModalConfirm: FC<ModalConfirmProps> = ({ visible = false, title, content, btnYes, btnNo, onYes, onNo }) => {
  const t = useTranslations();

  return (
    <AlertDialog open={visible}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onNo}>{btnYes ?? t('btn_no')}</AlertDialogCancel>
          <AlertDialogAction onClick={onYes}>{btnNo ?? t('btn_yes')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConfirm;
