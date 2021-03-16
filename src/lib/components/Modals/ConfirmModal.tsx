import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, IconButton } from '@material-ui/core';

export interface IConfirmModal {
  title: string;
  icon: JSX.Element;
  handleChoice: () => void;
}

const AlertDialog: React.FC<IConfirmModal> = ({
  title,
  icon,
  handleChoice,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>{icon}</IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => {
              handleChoice();
              setOpen(false);
            }}
            color="primary"
          >
            Так
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ні
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
