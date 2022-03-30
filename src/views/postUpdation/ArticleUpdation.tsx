import React from 'react';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';
import { IPost } from '../../old/lib/types';
import { TextPostUpdation } from './TextPostUpdation';

export interface IArticleUpdationProps {
  post: IPost;
}

export const ArticleUpdation: React.FC<IArticleUpdationProps> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <TextPostUpdation
      post={post}
      pageTitle={t(langTokens.editor.articleUpdation)}
      titleInputLabel={`${t(langTokens.editor.articleTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.articleText)}:`}
    />
  );
};
