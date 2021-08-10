import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NoteEditorToolbar from '../../components/Editor/Editors/NoteEditorToolbar';
import { PostTypeEnum } from '../../old/lib/types';
import { TextPostCreation } from './TextPostCreation';
import { setGALocation } from '../../utilities/setGALocation';
import { langTokens } from '../../locales/localizationInit';
import Page404 from '../../old/lib/components/Errors/Page404';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';

const NoteCreation: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    setGALocation(window);
  }, []);

  const {authenticated} = useContext(AuthContext)

  return authenticated ? (
    <TextPostCreation
      editorToolbar={NoteEditorToolbar}
      pageTitle={t(langTokens.editor.postCreation)}
      titleInputLabel={`${t(langTokens.editor.postTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.postText)}:`}
      postType={{
        type: PostTypeEnum.DOPYS,
        name: t(langTokens.common.article),
      }}
    />
  ) : <Page404/>;
};

export default NoteCreation;
