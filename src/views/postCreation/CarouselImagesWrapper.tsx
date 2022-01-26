/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useSelector } from 'react-redux';
// import { selectAuthorities } from '../../models/authorities';
import { Box, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BorderBottom } from '../../old/lib/components/Border';
import { uploadImageToImgur } from '../../old/lib/utilities/Imgur/uploadImageToImgur';
import { BackgroundImageContainer } from '../../components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';
import { langTokens } from '../../locales/localizationInit';
import { useStyle } from './RequiredFieldsStyle';
import { fileSelectorHandler } from './fileSelectorHandler';
import { IPost } from '../../old/lib/types';

export const CarouselImagesWrapper = ({
  post,
  previewPost,
  importantImageUrl,
  setImportantImageUrl,
  importantMobileImageUrl,
  setImportantMobileImageUrl,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();

  // const authorities = useSelector(selectAuthorities);
  // const isAdmin = authorities.data?.includes('SET_IMPORTANCE');
  return (
    <>
      <Box>
        <Typography variant="h5">
          {t(langTokens.editor.carouselImage)}
        </Typography>
        <Typography variant="subtitle2" className={classes.imageSizeText}>
          {t(langTokens.editor.allSizesWarning)}
        </Typography>
        <Box className={classes.carouselImagesContainer}>
          <Box className={classes.carouselImageWrapper}>
            <BackgroundImageContainer
              dispatchImageUrl={setImportantImageUrl}
              fileSelectorHandler={fileSelectorHandler(setImportantImageUrl)}
              title=""
              imgUrl={previewPost?.importantImageUrl}
              notCarousel={false}
              forMobilePic={false}
            />
            <Typography variant="subtitle2" className={classes.imageSizeText}>
              {t(langTokens.editor.pcImageSize)}
            </Typography>
          </Box>
          <Box className={classes.carouselImageWrapper}>
            <BackgroundImageContainer
              dispatchImageUrl={setImportantMobileImageUrl}
              fileSelectorHandler={fileSelectorHandler(
                setImportantMobileImageUrl,
              )}
              title=""
              imgUrl={previewPost?.importantMobileImageUrl}
              notCarousel={false}
              forMobilePic
            />
            <Typography variant="subtitle2" className={classes.imageSizeText}>
              {t(langTokens.editor.mobileImageSize)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
