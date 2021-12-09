/* eslint-disable */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Paper from '@material-ui/core/Paper';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './FileInput.style';
import { IFileInputProps } from '../types';
import { langTokens } from '../../../../locales/localizationInit';

export const FileInput: React.FC<IFileInputProps> = ({ onDrop }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Paper variant="outlined" {...getRootProps()} className={classes.root}>
      <CropOriginalIcon className={classes.icon} />
      <input data-testid="file-input" {...getInputProps()} />
      <Typography variant="subtitle1" className={classes.imgInputText}>
        {t(langTokens.editor.addImgFromPC)}
      </Typography>
    </Paper>
  );
};
