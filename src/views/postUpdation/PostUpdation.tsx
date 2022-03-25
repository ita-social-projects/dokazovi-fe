import React from 'react';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';
import ArticleEditorToolbar from '../../components/Editor/Editors/ArticleEditorToolbar';
import { VideoEditorToolbar } from '../../components/Editor/Editors/VideoEditorToolbar';
import { IPost } from '../../old/lib/types';
import { TextPostUpdation } from './TextPostUpdation';
import { VideoPostUpdation } from './VideoUpdation/VideoPostUpdation';

export interface IPostUpdationProps {
  post: IPost;
}

export const PostUpdation: React.FC<IPostUpdationProps> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <>
      {post.type.id !== 2 ? (
        <TextPostUpdation
          post={post}
          editorToolbar={ArticleEditorToolbar}
          pageTitle={t(langTokens.editor.articleUpdation)}
          titleInputLabel={`${t(langTokens.editor.articleTitle)}:`}
          contentInputLabel={`${t(langTokens.editor.articleText)}:`}
        />
      ) : (
        <VideoPostUpdation
          post={post}
          editorToolbar={VideoEditorToolbar}
          pageTitle={t(langTokens.editor.videoUpdation)}
          titleInputLabel={`${t(langTokens.editor.videoTitle)}:`}
          contentInputLabel={`${t(langTokens.editor.videoDescription)}:`}
        />
      )}
    </>
  );
};
