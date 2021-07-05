import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { UrlInputModal } from '../UrlInputModal';
import { IBackgroundImageContainerProps } from '../types';
import { useStyles } from './backgroundImageContainer.style';
import { langTokens } from '../../../../locales/localizationInit';

export const BackgroundImageContainer: React.FC<IBackgroundImageContainerProps> = ({
  dispatchImageUrl,
  fileSelectorHandler,
  newPost,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box mt={2} display="flex" flexDirection="column" alignItems="start">
      <Typography variant="h5">{`${t(
        langTokens.editor.backgroundImage,
      )}:`}</Typography>
      <Box mb={2}>
        <UrlInputModal updateBackgroundImage={dispatchImageUrl} />
        <input type="file" name="file" onChange={fileSelectorHandler} />
      </Box>
      {newPost?.previewImageUrl && (
        <img
          src={newPost?.previewImageUrl}
          alt="preview"
          className={classes.imageFrame}
        />
      )}
    </Box>
  );
};
