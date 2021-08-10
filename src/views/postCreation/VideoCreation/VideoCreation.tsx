import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { VideoEditorToolbar } from '../../../components/Editor/Editors/VideoEditorToolbar';
import { VideoPostCreation } from './VideoPostCreation';
import { setGALocation } from '../../../utilities/setGALocation';
import { langTokens } from '../../../locales/localizationInit';
import { selectCurrentUser } from '../../../models/user';
import Page404 from '../../../old/lib/components/Errors/Page404';

const VideoCreation: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setGALocation(window);
  }, []);

  const user = useSelector(selectCurrentUser);

  return user.data ? (
    <VideoPostCreation
      editorToolbar={VideoEditorToolbar}
      pageTitle={t(langTokens.editor.videoCreation)}
      titleInputLabel={`${t(langTokens.editor.videoTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.videoDescription)}:`}
    />
  ) : <Page404/>;
};

export default VideoCreation;
