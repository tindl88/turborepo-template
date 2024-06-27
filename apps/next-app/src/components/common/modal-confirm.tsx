import React, { FC, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '~react-web-ui-shadcn/components/ui/alert-dialog';

type ModalConfirmProps = {
  visible: boolean;
  title: string;
  content?: ReactNode;
  btnYes?: string;
  btnNo?: string;
  onYes: () => void;
  onNo: () => void;
};

const ModalConfirm: FC<ModalConfirmProps> = ({
  visible = false,
  title,
  content,
  btnYes = 'OK',
  btnNo = 'Cancel',
  onYes,
  onNo
}) => {
  return (
    <AlertDialog open={visible}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onNo}>{btnNo}</AlertDialogCancel>
          <AlertDialogAction onClick={onYes}>{btnYes}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConfirm;
