import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BackgroundImageContainer } from '../../components/Editor/CustomModules/BackgroundImageContainer/BackgroundImageContainer';
import { langTokens } from '../../locales/localizationInit';
import { useStyle } from './RequiredFieldsStyle';
import { fileSelectorHandler } from './fileSelectorHandler';
import { IPost } from '../../old/lib/types';
import { CreatePostRequestType } from '../../old/lib/utilities/API/types';

interface ICarouselImagesWrapperProps {
  post: IPost | CreatePostRequestType;
  setImportantImageUrl:
    | React.Dispatch<React.SetStateAction<string>>
    | { (previewImageUrl: string): void };
  setImportantMobileImageUrl:
    | React.Dispatch<React.SetStateAction<string>>
    | { (previewImageUrl: string): void };
}

export const CarouselImagesWrapper: React.FC<ICarouselImagesWrapperProps> = ({
  post,
  setImportantImageUrl,
  setImportantMobileImageUrl,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
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
              imgUrl={post?.importantImageUrl}
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
              imgUrl={post?.importantMobileImageUrl}
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
