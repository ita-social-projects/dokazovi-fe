import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { UrlInputModal } from '../UrlInputModal/UrlInputModal';
import { IBackgroundImageContainerProps } from '../types';
import { useStyles } from './backgroundImageContainer.style';
import { FileInput } from '../FileInput/FileInput';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Swal from 'sweetalert2';
import './backgroundImageContainer.css';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../../../locales/localizationInit';

export const BackgroundImageContainer: React.FC<IBackgroundImageContainerProps> = ({
  dispatchImageUrl,
  fileSelectorHandler,
  imgUrl,
  title,
  notCarousel = true,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const swalWithCustom = Swal.mixin({
    customClass: {
      container: 'swal-container',
      htmlContainer: 'swal-text',
      confirmButton: 'btn btn-confirm',
      cancelButton: 'btn btn-cancel',
    },
    buttonsStyling: false,
  });

  const onDelete = () => {
    swalWithCustom
      .fire({
        text: t(langTokens.editor.confirmImgRemoving),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: t(langTokens.common.yes),
        cancelButtonText: t(langTokens.common.no),
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatchImageUrl('');
          swalWithCustom.fire({
            text: t(langTokens.editor.removingSucceeded),
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          });
          // toast.success(t(langTokens.editor.removingSucceeded));
        }
      });
  };

  return (
    <Box mt={2} display="flex" flexDirection="column" alignItems="start">
      <Typography variant="h5">{`${title}:`}</Typography>
      <Box mb={2}>
        {notCarousel && (
          <UrlInputModal updateBackgroundImage={dispatchImageUrl} />
        )}

        <FileInput onChange={fileSelectorHandler} />
      </Box>
      {imgUrl && (
        <Box className={classes.imgContainer}>
          <img src={imgUrl} alt={'preview'} className={classes.imageFrame} />
          <IconButton className={classes.deleteButton} onClick={onDelete}>
            <DeleteForeverIcon className={classes.deleteIcon} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
