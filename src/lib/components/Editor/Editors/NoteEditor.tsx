import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import GeneralEditor from '../GeneralEditor';
import NoteEditorToolbar from './NoteEditorToolbar';

const NoteEditor: React.FC = () => {
  const [editor, setEditor] = useState<Quill>();
  const noteEditor = useRef<ReactQuill | null>(null);

  useEffect(() => {
    if (noteEditor.current) setEditor(noteEditor.current.getEditor());
  }, []);

  return (
    <>
      <GeneralEditor
        type="DOPYS"
        dispatchContent={(s) => ''} // tmp stub
        toolbar={<NoteEditorToolbar editor={editor} />}
        ref={noteEditor}
      />
    </>
  );
};

export default NoteEditor;
