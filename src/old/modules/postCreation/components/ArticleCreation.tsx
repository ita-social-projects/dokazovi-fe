import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ArticleEditorToolbar from '../../../lib/components/Editor/Editors/ArticleEditorToolbar';
import { PostTypeEnum } from '../../../lib/types';
import { TextPostCreation } from './TextPostCreation';
import { setGALocation } from '../../../../utilities/setGALocation';
import { langTokens } from '../../../../locales/localizationInit';

const ArticleCreation: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <TextPostCreation
      editorToolbar={ArticleEditorToolbar}
      pageTitle={t(langTokens.editor.articleCreation)}
      titleInputLabel={`${t(langTokens.editor.articleTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.articleText)}:`}
      postType={{
        type: PostTypeEnum.ARTICLE,
        name: t(langTokens.common.post),
      }}
    />
  );
};

export default ArticleCreation;
