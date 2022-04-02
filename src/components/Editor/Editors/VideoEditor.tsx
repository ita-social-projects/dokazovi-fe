import React from 'react';
import { GeneralEditor } from '../GeneralEditor';

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
      />
    </>
  );
};

export default VideoEditor;
