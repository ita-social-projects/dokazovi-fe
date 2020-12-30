import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import GeneralEditor from '../GeneralEditor';
import ArticleEditorToolbar from './ArticleEditorToolbar';

const ArticleEditor: React.FC = () => {
  const [editor, setEditor] = useState<Quill>();
  const myref = useRef<ReactQuill | null>(null);

  useEffect(() => {
    setEditor(myref.current?.getEditor());
  }, []);

  return (
    <>
      <GeneralEditor toolbar={<ArticleEditorToolbar />} ref={myref} />
    </>
  );
};

export default ArticleEditor;
