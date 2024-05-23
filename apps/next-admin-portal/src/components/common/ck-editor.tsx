import React, { FC } from 'react';
import type { Editor, EditorConfig } from '@ckeditor/ckeditor5-core';
import { CKEditor as MyEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@/libs/ckeditor/ckeditor';

interface ICKEditorProps {
  value?: string;
  toolbar?: string[];
  minHeight?: number;
  onFocus?: (event: unknown, editor: Editor) => void;
  onBlur?: (event: unknown, editor: Editor) => void;
  onReady?: (editor: Editor) => void;
  onChange: (data: string) => void;
  onShowFileManager?: () => void;
}

const defaultToolbar = [
  'heading',
  'undo',
  'redo',
  '|',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  '|',
  'alignment',
  'bulletedList',
  'numberedList',
  'outdent',
  'indent',
  'link',
  'blockQuote',
  'insertTable',
  'mediaEmbed',
  'fileManager',
  'sourceEditing'
];

const CKEditor: FC<ICKEditorProps> = ({
  value,
  toolbar,
  minHeight,
  onReady,
  onFocus,
  onBlur,
  onChange,
  onShowFileManager
}) => {
  return (
    <div className="prose">
      <MyEditor
        editor={ClassicEditor}
        config={
          {
            toolbar: toolbar ?? defaultToolbar,
            image: {
              toolbar: [
                'imageStyle:alignLeft',
                'imageStyle:alignRight',
                '|',
                'imageStyle:alignBlockLeft',
                'imageStyle:alignCenter',
                'imageStyle:alignBlockRight',
                '|',
                'toggleImageCaption',
                'imageTextAlternative'
              ]
            },
            actions: { showFileManager: onShowFileManager }
          } as EditorConfig
        }
        data={value || ''}
        onReady={editor => {
          if (minHeight) {
            editor.editing.view.change(writer => {
              const root = editor.editing.view.document.getRoot();

              if (root) {
                writer.setStyle('height', minHeight + 'px', root);
              }
            });
          }

          onReady?.(editor);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(event, editor) => {
          const text = editor.getData();

          onChange(text);
        }}
      />
    </div>
  );
};

export default CKEditor;
