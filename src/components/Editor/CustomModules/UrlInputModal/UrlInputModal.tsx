import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, Typography, Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { insertFromUrl } from '../ImageFromURLHandler';
import { IUrlInputModalProps } from '../types';
import { langTokens } from '../../../../locales/localizationInit';
import { useStyles } from './UrlInputModal.style';

export const UrlInputModal: React.FC<IUrlInputModalProps> = ({
  editor,
  updateBackgroundImage,
}) => {
  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors } = useForm();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [url, setUrl] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUrl('');
  };

  const onSubmitHandler = () => {
    if (updateBackgroundImage) {
      updateBackgroundImage(url);
    }
    handleClose();
    insertFromUrl(url, editor);
    setUrl('');
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setUrl(e.target.value);
  };

  return (
    <div>
      <Paper
        variant="outlined"
        className={classes.root}
        onClick={handleClickOpen}
      >
        <IconButton title={t(langTokens.editor.byUrl)} disableRipple>
          <CloudUpload className={classes.icon} />
        </IconButton>
        <Typography variant="subtitle1" className={classes.imgInputText}>
          {t(langTokens.editor.addImgFromExternalResource)}
        </Typography>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {t(langTokens.editor.byUrl)}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <DialogContentText>
              {`${t(langTokens.editor.enterUrlForImage)} https://www...`}
            </DialogContentText>
            {errors.url && (
              <Alert severity="error">
                {`${t(langTokens.editor.fillFieldWithUrl)}!`}
              </Alert>
            )}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="https://www..."
              type="text"
              fullWidth
              onChange={(e) => onChangeHandler(e)}
              name="url"
              inputRef={register({
                required: true,
              })}
            />

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {t(langTokens.common.cancel)}
              </Button>
              <Button color="primary" type="submit">
                {t(langTokens.common.add)}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
