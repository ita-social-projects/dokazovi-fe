import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Quill from 'quill';
import { Alert } from '@material-ui/lab';
import insertFromUrl from './ImageFromURLHandler';

interface IUrlInputModalProps {
  editor?: Quill;
}

const UrlInputModal: React.FC<IUrlInputModalProps> = ({ editor }) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors } = useForm();

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
      <IconButton onClick={handleClickOpen} title="За посиланням" disableRipple>
        <CropOriginalIcon
          className="customSVGIcon"
          fontSize="small"
          style={{ width: '18px', height: '18px' }}
        />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">За посиланням</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <DialogContentText>
              Введіть посилання на зображення https://www...
            </DialogContentText>
            {errors.url && (
              <Alert severity="error">Заповніть поле з посиланням!</Alert>
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
                Скасувати
              </Button>
              <Button color="primary" type="submit">
                Додати
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UrlInputModal;
