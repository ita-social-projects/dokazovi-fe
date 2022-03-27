import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PostTypeEnum } from '../../old/lib/types';
import { TextPostCreation } from './TextPostCreation';
import { PostCreation } from './PostCreation';
import { setGALocation } from '../../utilities/setGALocation';
import { langTokens } from '../../locales/localizationInit';

const ArticleCreation: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <PostCreation
      pageTitle={t(langTokens.editor.articleCreation)}
      titleInputLabel={`${t(langTokens.editor.articleTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.articleText)}:`}
      postType={{
        type: PostTypeEnum.ARTICLE,
        name: t(langTokens.common.article),
      }}
    />
  );
};

export default ArticleCreation;
