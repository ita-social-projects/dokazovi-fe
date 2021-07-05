import React from 'react';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../../locales/localizationInit';
import { VideoEditorToolbar } from '../../../components/Editor/Editors/VideoEditorToolbar';
import { IPost } from '../../../old/lib/types';
import { VideoPostUpdation } from './VideoPostUpdation';

export interface IVideoUpdationProps {
  post: IPost;
}

export const VideoUpdation: React.FC<IVideoUpdationProps> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <VideoPostUpdation
      post={post}
      editorToolbar={VideoEditorToolbar}
      pageTitle={t(langTokens.editor.videoUpdation)}
      titleInputLabel={`${t(langTokens.editor.videoTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.videoDescription)}:`}
    />
  );
};
