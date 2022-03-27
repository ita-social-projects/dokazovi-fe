import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PostTypeEnum } from '../../../old/lib/types';
import { VideoPostCreation } from './VideoPostCreation';
import { PostCreation } from '../PostCreation';
import { setGALocation } from '../../../utilities/setGALocation';
import { langTokens } from '../../../locales/localizationInit';

const VideoCreation: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <PostCreation
      pageTitle={t(langTokens.editor.videoCreation)}
      titleInputLabel={`${t(langTokens.editor.videoTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.videoDescription)}:`}
      postType={{
        type: PostTypeEnum.VIDEO,
        name: t(langTokens.common.video),
      }}
    />
  );
};

export default VideoCreation;
