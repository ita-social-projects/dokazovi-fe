import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import GeneralEditor from '../GeneralEditor';
import NoteEditorToolbar from './NoteEditorToolbar';

const NoteEditor: React.FC = () => {
  const [editor, setEditor] = useState<Quill>();
  const myref = useRef<ReactQuill | null>(null);

  useEffect(() => {
    setEditor(myref.current?.getEditor());
  }, []);

  return (
    <>
      <GeneralEditor toolbar={<NoteEditorToolbar />} ref={myref} />
    </>
  );
};

export default NoteEditor;
