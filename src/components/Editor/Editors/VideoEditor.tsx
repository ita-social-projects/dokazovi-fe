import React from 'react';
import { GeneralEditor } from '../GeneralEditor';
import { VideoEditorToolbar } from './VideoEditorToolbar';

interface IVideoEditorProps {
  initialHtmlContent?: string;
  onHtmlContentChange: (content: string) => void;
}

const VideoEditor: React.FC<IVideoEditorProps> = ({
  initialHtmlContent,
  onHtmlContentChange,
}) => {
  return (
    <>
      <GeneralEditor
        initialHtmlContent={initialHtmlContent}
        onHtmlContentChange={onHtmlContentChange}
        toolbar={VideoEditorToolbar}
      />
    </>
  );
};

export default VideoEditor;
