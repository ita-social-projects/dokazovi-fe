import React from 'react';
import { VideoEditorToolbar } from '../../../old/lib/components/Editor/Editors/VideoEditorToolbar';
import { IPost } from '../../../old/lib/types';
import { VideoPostUpdation } from './VideoPostUpdation';

export interface IVideoUpdationProps {
  post: IPost;
}

export const VideoUpdation: React.FC<IVideoUpdationProps> = ({ post }) => {
  return (
    <VideoPostUpdation
      post={post}
      editorToolbar={VideoEditorToolbar}
      pageTitle="Редагування відео"
      titleInputLabel="Заголовок відео:"
      contentInputLabel="Опис відео:"
    />
  );
};
