import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import GeneralEditor from '../GeneralEditor';
import ArticleEditorToolbar from './ArticleEditorToolbar';

interface IArticleEditorProps {
  dispatchContent: (content: string) => void;
}

const ArticleEditor: React.FC<IArticleEditorProps> = ({ dispatchContent }) => {
  const [editor, setEditor] = useState<Quill>();
  const articleEditor = useRef<ReactQuill | null>(null);

  useEffect(() => {
    if (articleEditor.current) setEditor(articleEditor.current.getEditor());
  }, []);

  return (
    <>
      <GeneralEditor
        dispatchContent={dispatchContent}
        toolbar={<ArticleEditorToolbar editor={editor} />}
        ref={articleEditor}
      />
    </>
  );
};

export default ArticleEditor;
