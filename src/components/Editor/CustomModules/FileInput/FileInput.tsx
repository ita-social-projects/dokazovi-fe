import React from 'react';
import Dropzone from 'react-dropzone';
import Paper from '@material-ui/core/Paper';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { Typography } from '@material-ui/core';
import { useStyles } from './FileInput.style';
import { IFileInputProps } from '../types';

export const FileInput: React.FC<IFileInputProps> = ({
  onChange,
  name,
  files,
}) => {
  const classes = useStyles();

  // let file = files ? files[0] : null;

  // let reader = new FileReader();
  // reader.onload = function (theFile) {
  //   let image = new Image();
  //   image.onload = function () {
  //     // @ts-ignore
  //     console.log(this.width + ' ' + this.height);
  //   };
  //   // @ts-ignore
  //   image.src = theFile?.target?.result;
  // };
  // file && reader.readAsDataURL(file);

  return (
    <Dropzone>
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
  );
};
