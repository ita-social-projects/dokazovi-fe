import { Container } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import { PostTypeEnum } from '../../../types';
import GeneralEditor from '../GeneralEditor';
import VideoEditorToolbar from './VideoEditorToolbar';

interface IVideoEditorProps {
  dispatchContent: (content: string) => void;
}

const VideoEditor: React.FC<IVideoEditorProps> = ({ dispatchContent }) => {
  const [editor, setEditor] = useState<Quill>();
  const videoEditor = useRef<ReactQuill | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');

  useEffect(() => {
    if (videoEditor.current) {
      setEditor(videoEditor.current.getEditor());
      setEditorContent(videoEditor.current.getEditor().getText().slice(0, -1)); // slice removes additional \n added by Quill
    }
  }, []);

  editor?.on('text-change', () => {
    setEditorContent(editor.getText());
  });

  return (
    <Container>
      <GeneralEditor
        type={PostTypeEnum.VIDEO}
        dispatchContent={dispatchContent}
        toolbar={<VideoEditorToolbar editor={editor} />}
        ref={videoEditor}
      />
    </Container>
  );
};

export default VideoEditor;
