import React from 'react';
import GeneralEditor from '../GeneralEditor';
import VideoEditorToolbar from './VideoEditorToolbar';

interface IVideoEditorProps {
  initialContent?: string;
  dispatchContent: (content: string) => void;
}

const VideoEditor: React.FC<IVideoEditorProps> = ({
  initialContent,
  dispatchContent,
}) => {
  return (
    <>
      <GeneralEditor
        initialContent={initialContent}
        dispatchHtmlContent={dispatchContent}
        toolbar={VideoEditorToolbar}
      />
    </>
  );
};

export default VideoEditor;
