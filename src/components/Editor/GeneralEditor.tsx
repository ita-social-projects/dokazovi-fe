import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import { modules, formats } from './utilities';
import 'react-quill/dist/quill.snow.css';
import { EditorToolbar } from './Editors/EditorToolbar';

export interface IQuillEditorProps {
  isVideoPost?: boolean;
  initialHtmlContent?: string;
  onHtmlContentChange: (htmlContent: string) => void;
  onTextContentChange?: (textContent: string) => void;
}

const Editor: React.FC<IQuillEditorProps> = (props) => {
  const {
    initialHtmlContent,
    onHtmlContentChange,
    onTextContentChange,
    isVideoPost,
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
    <div className="text-editor" data-testid="text-editor_test">
      <EditorToolbar editor={editor} isVideoPost={isVideoPost} />
      <ReactQuill
        theme="snow"
        defaultValue={initialHtmlContent}
        onChange={onHtmlContentChange}
        placeholder="Write something awesome..."
        modules={modules}
        formats={formats}
        ref={editorRef}
        scrollingContainer="html"
      />
    </div>
  );
};

export const GeneralEditor = React.memo(Editor);
