import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { UrlInputModal } from '../UrlInputModal';
import { IBackgroundImageContainerProps } from '../types';
import { useStyles } from './backgroundImageContainer.style';
import { FileInput } from '../FileInput';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Swal from 'sweetalert2';

export const BackgroundImageContainer: React.FC<IBackgroundImageContainerProps> = ({
  dispatchImageUrl,
  fileSelectorHandler,
  imgUrl,
  title,
  files,
  name,
  handleDelete,
}) => {
  const classes = useStyles();

  const url = window.URL || window.webkitURL;
  const file = files ? files[0] : null;

  const isImageUrl = imgUrl ? imgUrl : file ? url.createObjectURL(file) : null;

  const swalWithCustom = Swal.mixin({
    customClass: {
      container: classes.swalContainer,
      htmlContainer: classes.swalText,
      confirmButton: classes.swalButtonConfirm,
      cancelButton: classes.swalButtonCancel,
    },
    buttonsStyling: false,
  });

  const onDelete = () => {
    swalWithCustom
      .fire({
        text: 'Ви впевнені, що хочете видалити цю картинку?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ТАК',
        cancelButtonText: 'НІ',
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (handleDelete) {
            handleDelete(null);
          }
          dispatchImageUrl('');
          swalWithCustom.fire({
            text: 'Успішно видалено!',
            icon: 'success',
          });
        }
      });
  };

  return (
    <Box mt={2} display="flex" flexDirection="column" alignItems="start">
      <Typography variant="h5">{`${title}:`}</Typography>
      <Box mb={2}>
        <UrlInputModal
          updateBackgroundImage={dispatchImageUrl}
          handleDelete={handleDelete}
        />
        {/*<input type="file" name="file" onChange={fileSelectorHandler}/>*/}
        <FileInput
          onChange={fileSelectorHandler}
          name={name}
          files={files}
          handleDelete={handleDelete}
        />
      </Box>
      {isImageUrl && (
        <Box className={classes.imgContainer}>
          <img src={isImageUrl} alt={'preview'} />
          <IconButton className={classes.deleteButton} onClick={onDelete}>
            <DeleteForeverIcon className={classes.deleteIcon} />
          </IconButton>
        </Box>
      )}
      {/*{*/}
      {/*    file && (*/}
      {/*        <Box className={classes.imgContainer}>*/}
      {/*            <img src={url.createObjectURL(file)} alt={'preview'}/>*/}
      {/*            <IconButton className={classes.deleteButton} onClick={onDelete}>*/}
      {/*                <DeleteForeverIcon className={classes.deleteIcon}/>*/}
      {/*            </IconButton>*/}
      {/*        </Box>*/}
      {/*    )*/}
      {/*}*/}
    </Box>
  );
};
