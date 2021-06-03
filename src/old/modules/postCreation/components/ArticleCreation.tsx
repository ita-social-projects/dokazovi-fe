import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import ArticleEditorToolbar from '../../../lib/components/Editor/Editors/ArticleEditorToolbar';
import { PostTypeEnum } from '../../../lib/types';
import { TextPostCreation } from './TextPostCreation';

const ArticleCreation: React.FC = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <TextPostCreation
      editorToolbar={ArticleEditorToolbar}
      pageTitle="Створення статті"
      titleInputLabel="Заголовок статті:"
      contentInputLabel="Текст статті:"
      postType={{ type: PostTypeEnum.ARTICLE, name: 'Стаття' }}
    />
  );
};

export default ArticleCreation;
