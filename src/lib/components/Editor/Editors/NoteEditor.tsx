import { Container } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import BorderBottom from '../../Border';
import ContentPreviewContainer from '../ContentPreviewContainer';
import GeneralEditor from '../GeneralEditor';
import NoteEditorToolbar from './NoteEditorToolbar';

const NoteEditor: React.FC = () => {
  const [editor, setEditor] = useState<Quill>();
  const noteEditor = useRef<ReactQuill | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');

  useEffect(() => {
    if (noteEditor.current) setEditor(noteEditor.current.getEditor());
  }, []);

  editor?.on('text-change', () => {
    setEditorContent(editor.getText());
  });

  return (
    <>
      <Container>
        <GeneralEditor
          toolbar={<NoteEditorToolbar editor={editor} />}
          ref={noteEditor}
        />
        <BorderBottom />
        <ContentPreviewContainer previewText={editorContent} />
      </Container>
    </>
  );
};

export default NoteEditor;