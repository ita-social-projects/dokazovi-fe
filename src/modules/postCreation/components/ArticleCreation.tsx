import React from 'react';
import ArticleEditorToolbar from '../../../lib/components/Editor/Editors/ArticleEditorToolbar';
import { PostTypeEnum } from '../../../lib/types';
import { TextPostCreation } from './TextPostCreation';

const ArticleCreation: React.FC = () => {
  return (
    <TextPostCreation
      editorToolbar={ArticleEditorToolbar}
      pageTitle="Створення статті"
      postType={{ type: PostTypeEnum.ARTICLE, name: 'Стаття' }}
    />
  );
};

export default ArticleCreation;
