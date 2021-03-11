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
import { parseVideoIdFromUrl } from '../../../utilities/parseVideoIdFromUrl';

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
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const canParseId = (url) => {
    if (parseVideoIdFromUrl(url)) {
      return true;
    }
    return false;
  };

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
        <span>Відеофайл:</span>
        <IconButton
          color="primary"
          aria-label="upload picture"
          onClick={handleClickOpen}
          title="За посиланням"
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
        <DialogTitle id="form-dialog-title">За посиланням</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <DialogContentText>
              Введіть посилання на відео https://www.youtube.com/...
            </DialogContentText>
            {errors.url && errors.url.type === 'required' && (
              <Alert severity="error">Заповніть поле з посиланням!</Alert>
            )}

            {errors.url && errors.url.type === 'correctLink' && (
              <Alert severity="error">Введіть коректну URL-адресу!</Alert>
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
              <Button onClick={handleClose} color="primary">
                Скасувати
              </Button>
              <Button color="primary" type="submit">
                Додати
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VideoUrlInputModal;
