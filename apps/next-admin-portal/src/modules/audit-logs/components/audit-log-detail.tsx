import React, { FC, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader } from '~react-web-ui-shadcn/components/ui/dialog';
import { Loading } from '~react-web-ui-shadcn/components/ui/loading';
import { Separator } from '~react-web-ui-shadcn/components/ui/separator';

import ContentRenderer from '@/components/content-renderer';

import { usePostsState } from '@/modules/posts/states/posts.state';

type AuditLogDetailProps = {
  id: string;
  visible: boolean;
  onCancel?: () => void;
};

const AuditLogDetail: FC<AuditLogDetailProps> = ({ id, visible, onCancel }) => {
  const postsState = usePostsState();

  useEffect(() => {
    if (visible) {
      postsState.readRequest(id);
    }
  }, [visible, id]);

  return (
    <Dialog open={visible} onOpenChange={onCancel}>
      <DialogContent className="top-0 max-w-7xl translate-y-0">
        {postsState.isReading && (
          <div className="flex items-center justify-center py-10">
            <Loading />
          </div>
        )}

        {!postsState.isReading && !!postsState.detail && (
          <>
            <DialogHeader>
              <h2 className="text-xl font-bold">{postsState.detail.name}</h2>
            </DialogHeader>
            <div className="prose mt-4">
              <div>
                <ContentRenderer data={postsState.detail.description} />
              </div>
              <Separator className="my-4" />
              <div>
                <ContentRenderer data={postsState.detail.body} />
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuditLogDetail;
