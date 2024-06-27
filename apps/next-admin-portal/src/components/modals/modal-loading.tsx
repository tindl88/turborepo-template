import React, { FC } from 'react';
import { AlertDialog, AlertDialogContent } from '~react-web-ui-shadcn/components/ui/alert-dialog';
import { Loading } from '~react-web-ui-shadcn/components/ui/loading';

type ModalLoadingProps = {
  visible: boolean;
  onClose?: () => void;
};

const ModalLoading: FC<ModalLoadingProps> = ({ visible = false, onClose }) => {
  return (
    <AlertDialog open={visible}>
      <AlertDialogContent className="flex max-w-32 items-center justify-center">
        <Loading thickness={6} size={'lg'} onClick={onClose} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalLoading;
