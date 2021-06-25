import React from 'react';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../../../locales/localizationInit';
import ArticleEditorToolbar from '../../../lib/components/Editor/Editors/ArticleEditorToolbar';
import { IPost } from '../../../lib/types';
import { TextPostUpdation } from './TextPostUpdation';

export interface IArticleUpdationProps {
  post: IPost;
}

export const ArticleUpdation: React.FC<IArticleUpdationProps> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <TextPostUpdation
      post={post}
      editorToolbar={ArticleEditorToolbar}
      pageTitle={t(langTokens.editor.articleUpdation)}
      titleInputLabel={`${t(langTokens.editor.articleTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.articleText)}:`}
    />
  );
};
