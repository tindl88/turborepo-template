import React, { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '~ui/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~ui/components/ui/dialog';

type ModalInfoProps = {
  visible: boolean;
  title: string;
  content?: ReactNode;
  btnClose?: string;
  onClose: () => void;
};

const ModalInfo: FC<ModalInfoProps> = ({ visible = false, title, content, btnClose, onClose }) => {
  const t = useTranslations();

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={onClose}>
              {btnClose ?? t('btn_close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInfo;
