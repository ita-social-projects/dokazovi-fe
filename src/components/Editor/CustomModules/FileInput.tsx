import React from 'react';
import Dropzone from 'react-dropzone';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import { makeStyles } from '@material-ui/core/styles';
import image from 'quill-image-uploader/src/blots/image';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { Box, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#eee',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#333',
    padding: '10px',
    marginTop: '20px',
    '&:hover': {
      color: '#06c',
    },
  },
  icon: {
    marginTop: '16px',
    color: theme.palette.common.black,
    fontSize: '50px',
    '&:hover': {
      color: '#06c',
    },
  },
  imgContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  imgInputText: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '15px',
    lineHeight: '22px',
  },
  deleteButton: {
    position: 'absolute',
    backgroundColor: theme.palette.common.black,
    borderRadius: 0,
    right: 0,
    width: '45px',
    height: '45px',
    '&:hover': {
      backgroundColor: '#d5320b',
    },
  },
  deleteIcon: {
    fontSize: '37px',
  },
  swalContainer: {
    '& .swal2-popup': {
      width: '480px',
    },
  },
  swalText: {
    fontFamily: 'Raleway',
    fontWeight: 500,
    fontSize: '22px',
    lineHeight: '28px',
  },
  swalButtonConfirm: {
    padding: '12px 40px',
    borderRadius: '6px',
    backgroundColor: '#13829a',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#106ba3',
      cursor: 'pointer',
    },
  },
  swalButtonCancel: {
    padding: '12px 40px',
    borderRadius: '6px',
    backgroundColor: '#e8522e',
    marginLeft: '30px',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#af391d',
      cursor: 'pointer',
    },
  },
}));

export const FileInput = ({ onChange, name, files, handleDelete }) => {
  const classes = useStyles();

  let url = window.URL || window.webkitURL;
  let file = files ? files[0] : null;

  let reader = new FileReader();
  reader.onload = function (theFile) {
    let image = new Image();
    image.onload = function () {
      // @ts-ignore
      console.log(this.width + ' ' + this.height);
    };
    // @ts-ignore
    image.src = theFile?.target?.result;
  };
  file && reader.readAsDataURL(file);

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
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ТАК',
        cancelButtonText: 'НІ',
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDelete(null);
          swalWithCustom.fire({
            text: 'Успішно видалено!',
            icon: 'success',
          });
        }
      });
  };

  return (
    <>
      <Dropzone onDrop={onChange}>
        {({ getRootProps, getInputProps }) => (
          <Paper
            variant={'outlined'}
            {...getRootProps()}
            className={classes.root}
          >
            <CropOriginalIcon className={classes.icon} />
            <input {...getInputProps()} name={name} onChange={onChange} />
            <Typography variant="subtitle1" className={classes.imgInputText}>
              Завантажити зображення із комп'ютера
            </Typography>
          </Paper>
        )}
      </Dropzone>
      <List>
        {files &&
          [...files].map((el, idx) => (
            <ListItem key={idx}>
              <ListItemIcon>
                <InsertDriveFile />
              </ListItemIcon>
              <ListItemText primary={el.name} secondary={el.size} />
            </ListItem>
          ))}
      </List>
      {/*{*/}
      {/*    file && (*/}
      {/*        <Box className={classes.imgContainer}>*/}
      {/*            <img src={url.createObjectURL(file)} alt={'image'} style={{maxWidth: '300px'}}/>*/}
      {/*            <IconButton className={classes.deleteButton} onClick={onDelete} >*/}
      {/*                <DeleteForeverIcon className={classes.deleteIcon} />*/}
      {/*            </IconButton>*/}
      {/*        </Box>*/}
      {/*    )*/}
      {/*}*/}
    </>
  );
};
