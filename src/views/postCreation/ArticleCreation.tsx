import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ArticleEditorToolbar from '../../components/Editor/Editors/ArticleEditorToolbar';
import { PostTypeEnum } from '../../old/lib/types';
import { TextPostCreation } from './TextPostCreation';
import { setGALocation } from '../../utilities/setGALocation';
import { langTokens } from '../../locales/localizationInit';
import { selectCurrentUser } from '../../models/user';
import Page404 from '../../old/lib/components/Errors/Page404';

const ArticleCreation: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setGALocation(window);
  }, []);

  const user = useSelector(selectCurrentUser);

  return user.data ? (
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
  ) : <Page404/>;
};

export default ArticleCreation;
