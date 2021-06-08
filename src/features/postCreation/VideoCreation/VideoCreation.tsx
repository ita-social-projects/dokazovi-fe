import React, { useEffect } from 'react';
import { VideoEditorToolbar } from '../../../old/lib/components/Editor/Editors/VideoEditorToolbar';
import { PostTypeEnum } from '../../../old/lib/types';
import { VideoPostCreation } from './VideoPostCreation';
import { setGALocation } from '../../../utilities/setGALocation';

const VideoCreation: React.FC = () => {
  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <VideoPostCreation
      editorToolbar={VideoEditorToolbar}
      pageTitle="Створення відео"
      titleInputLabel="Заголовок відео:"
      contentInputLabel="Опис відео:"
      postType={{ type: PostTypeEnum.VIDEO, name: 'Відео' }}
    />
  );
};

export default VideoCreation;
