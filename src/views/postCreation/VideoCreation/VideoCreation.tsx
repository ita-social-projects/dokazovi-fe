import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VideoPostCreation } from './VideoPostCreation';
import { setGALocation } from '../../../utilities/setGALocation';
import { langTokens } from '../../../locales/localizationInit';

const VideoCreation: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <VideoPostCreation
      pageTitle={t(langTokens.editor.videoCreation)}
      titleInputLabel={`${t(langTokens.editor.videoTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.videoDescription)}:`}
    />
  );
};

export default VideoCreation;
