import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import { modules, formats } from './utilities';
import 'react-quill/dist/quill.snow.css';
import { IEditorToolbarProps } from './types';

export interface IQuillEditorProps {
  toolbar: React.ComponentType<IEditorToolbarProps>;
  initialHtmlContent?: string;
  onHtmlContentChange: (htmlContent: string) => void;
  onTextContentChange?: (textContent: string) => void;
}

const GeneralEditor: React.FC<IQuillEditorProps> = (props) => {
  const {
    initialHtmlContent,
    onHtmlContentChange,
    onTextContentChange,
  } = props;
  const editorRef = useRef<ReactQuill>(null);
  const [editor, setEditor] = useState<Quill>();

  useEffect(() => {
    if (editorRef.current) {
      const editorResult = editorRef.current.getEditor();
      setEditor(editorResult);

      if (onTextContentChange) {
        editorResult.on('text-change', () => {
          onTextContentChange(editorResult.getText());
        });
      }
    }
  }, []);

  return (
    <div className="text-editor">
      <props.toolbar editor={editor} />
      <ReactQuill
        theme="snow"
        defaultValue={initialHtmlContent}
        onChange={onHtmlContentChange}
        placeholder="Write something awesome..."
        modules={modules}
        formats={formats}
        ref={editorRef}
      />
    </div>
  );
};

export default React.memo(GeneralEditor);
