import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VideoEditorToolbar } from '../../../components/Editor/Editors/VideoEditorToolbar';
import { VideoPostCreation } from './VideoPostCreation';
import { setGALocation } from '../../../utilities/setGALocation';
import { langTokens } from '../../../locales/localizationInit';
import Page404 from '../../../old/lib/components/Errors/Page404';
import { AuthContext } from '../../../old/provider/AuthProvider/AuthContext';

const VideoCreation: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setGALocation(window);
  }, []);

  const { authenticated } = useContext(AuthContext);

  return authenticated ? (
    <VideoPostCreation
      editorToolbar={VideoEditorToolbar}
      pageTitle={t(langTokens.editor.videoCreation)}
      titleInputLabel={`${t(langTokens.editor.videoTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.videoDescription)}:`}
    />
  ) : (
    <Page404 />
  );
};

export default VideoCreation;
