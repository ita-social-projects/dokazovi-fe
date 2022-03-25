import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PostTypeEnum } from '../../old/lib/types';
import { TextPostCreation } from './TextPostCreation';
import { setGALocation } from '../../utilities/setGALocation';
import { langTokens } from '../../locales/localizationInit';

const NoteCreation: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <TextPostCreation
      pageTitle={t(langTokens.editor.noteCreation)}
      titleInputLabel={`${t(langTokens.editor.noteTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.noteText)}:`}
      postType={{
        type: PostTypeEnum.DOPYS,
        name: t(langTokens.common.post),
      }}
    />
  );
};

export default NoteCreation;
