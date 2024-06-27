import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import { Textarea } from '~react-web-ui-shadcn/components/ui/textarea';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/shadcn/style.css';

type BlockEditorProps = {
  value: string;
  onChange?: (text: string) => void;
} & ComponentBaseProps;

const BlockEditor: FC<BlockEditorProps> = ({ className, value, onChange }) => {
  const [html, setHTML] = useState<string>(value ?? '');
  const instance = useCreateBlockNote();

  const convertHTMLToBlocks = async (text: string) => {
    const blocks = await instance.tryParseHTMLToBlocks(text);

    instance.replaceBlocks(instance.document, blocks);
  };

  const htmlInputChanged = useCallback(
    async (e: ChangeEvent<HTMLTextAreaElement>) => {
      setHTML(e.target.value);
      convertHTMLToBlocks(e.target.value);
      onChange?.(e.target.value);
    },
    [instance]
  );

  const handleEditorChange = useCallback(async () => {
    const htmlMarkup = await instance.blocksToHTMLLossy(instance.document);

    setHTML(htmlMarkup);
    onChange?.(htmlMarkup);
  }, [instance]);

  useEffect(() => {
    convertHTMLToBlocks(html);
  }, [instance]);

  return (
    <div className={classNames('block-editor', className)}>
      <code>
        <Textarea className="text-sm" value={html} onChange={htmlInputChanged} />
      </code>
      <BlockNoteView editor={instance} onChange={handleEditorChange} />
    </div>
  );
};

export default BlockEditor;
