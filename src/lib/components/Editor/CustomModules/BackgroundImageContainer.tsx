import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { UrlInputModal } from './UrlInputModal';
import { IBackgroundImageContainerProps } from './types';

export const BackgroundImageContainer: React.FC<IBackgroundImageContainerProps> = ({
  dispatchImageUrl,
  fileSelectorHandler,
  newPost,
}) => {
  return (
    <Box mt={2} display="flex" flexDirection="column" alignItems="start">
      <Typography variant="h5">Фонове зображення:</Typography>
      <Box mb={2}>
        <UrlInputModal updateBackgroundImage={dispatchImageUrl} />
        <input type="file" name="file" onChange={fileSelectorHandler} />
      </Box>
      {newPost?.backgroundImageUrl && (
        <img
          src={`${newPost?.backgroundImageUrl}`}
          alt="preview"
          style={{ width: '360px', height: '240px' }}
        />
      )}
    </Box>
  );
};
