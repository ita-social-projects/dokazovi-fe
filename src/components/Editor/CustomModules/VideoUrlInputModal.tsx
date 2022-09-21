import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { IconButton, Box, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { parseVideoIdFromUrl } from '../../../old/lib/utilities/parseVideoIdFromUrl';
import { langTokens } from '../../../locales/localizationInit';
import { useStyle } from '../../../views/postCreation/RequiredFieldsStyle';

interface IVideoUrlInputModalProps {
  dispatchVideoUrl: (videoUrl: string) => void;
}

interface IFormData {
  url: string;
}

const VideoUrlInputModal: React.FC<IVideoUrlInputModalProps> = ({
  dispatchVideoUrl,
}) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors } = useForm<IFormData>();
  const { t } = useTranslation();
  const classes = useStyle();

  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVideoUrl('');
  };

  const canParseId = (url: string) => Boolean(parseVideoIdFromUrl(url));

  const onSubmitHandler = () => {
    const id = parseVideoIdFromUrl(videoUrl);
    if (id) {
      dispatchVideoUrl(videoUrl);
      handleClose();
    }
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setVideoUrl(e.target.value);
  };

  return (
    <Box mt={2}>
      <Typography variant="h5">
        <span className={classes.requiredField}>{`${t(
          langTokens.editor.videoFile,
        )}:`}</span>
        <IconButton
          color="primary"
          aria-label="upload picture"
          onClick={handleClickOpen}
          title={t(langTokens.editor.byUrl)}
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </Typography>
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
              {`${t(
                langTokens.editor.enterUrlForVideo,
              )} https://www.youtube.com/...`}
            </DialogContentText>
            {errors.url && errors.url.type === 'required' && (
              <Alert severity="error">
                {`${t(langTokens.editor.fillFieldWithUrl)}!`}
              </Alert>
            )}

            {errors.url && errors.url.type === 'correctLink' && (
              <Alert severity="error">
                {`${t(langTokens.editor.enterCorrectUrl)}!`}
              </Alert>
            )}
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="https://www.youtube.com/..."
              type="text"
              fullWidth
              onChange={(e) => onChangeHandler(e)}
              name="url"
              inputRef={register({
                required: true,
                validate: {
                  correctLink: (value) => {
                    return canParseId(value);
                  },
                },
              })}
            />
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="primary">
                {t(langTokens.common.cancel)}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!videoUrl}
              >
                {t(langTokens.common.add)}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VideoUrlInputModal;
