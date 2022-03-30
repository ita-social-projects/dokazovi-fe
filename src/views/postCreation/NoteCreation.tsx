import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PostTypeEnum } from '../../old/lib/types';
import { PostCreation } from './PostCreation';
import { setGALocation } from '../../utilities/setGALocation';
import { langTokens } from '../../locales/localizationInit';

const NoteCreation: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <PostCreation
      pageTitle={t(langTokens.editor.noteCreation)}
      titleInputLabel={`${t(langTokens.editor.noteTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.noteText)}:`}
      postType={{
        type: PostTypeEnum.DOPYS,
        name: t(langTokens.common.note),
      }}
    />
  );
};

export default NoteCreation;
