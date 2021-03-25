import React from 'react';
import ArticleEditorToolbar from '../../../lib/components/Editor/Editors/ArticleEditorToolbar';
import { IPost } from '../../../lib/types';
import { TextPostUpdation } from './TextPostUpdation';

export interface IArticleUpdationProps {
  post: IPost;
}

export const ArticleUpdation: React.FC<IArticleUpdationProps> = ({ post }) => {
  return (
    <TextPostUpdation
      post={post}
      editorToolbar={ArticleEditorToolbar}
      pageTitle="Редагування статті"
    />
  );
};
