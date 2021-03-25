import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import { PostTypeEnum } from '../../../types';
import { BorderBottom } from '../../Border';
import ContentPreviewContainer from '../ContentPreviewContainer';
import GeneralEditor from '../GeneralEditor';
import NoteEditorToolbar from './NoteEditorToolbar';

interface INoteEditorProps {
  dispatchContent: (content: string) => void;
}

export const NoteEditor: React.FC<INoteEditorProps> = ({ dispatchContent }) => {
  const [editor, setEditor] = useState<Quill>();
  const noteEditor = useRef<ReactQuill | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');

  useEffect(() => {
    if (noteEditor.current) {
      setEditor(noteEditor.current.getEditor());
      setEditorContent(noteEditor.current.getEditor().getText().slice(0, -1)); // slice removes additional \n added by Quill
    }
  }, []);

  editor?.on('text-change', () => {
    setEditorContent(editor.getText());
  });

  return (
    <>
      <GeneralEditor
        type={PostTypeEnum.DOPYS}
        dispatchContent={dispatchContent}
        toolbar={<NoteEditorToolbar editor={editor} />}
        ref={noteEditor}
      />
      <BorderBottom />
      <ContentPreviewContainer
        previewText={editorContent}
        previewType={PostTypeEnum.DOPYS}
        previewCardType="Допис"
      />
    </>
  );
};
