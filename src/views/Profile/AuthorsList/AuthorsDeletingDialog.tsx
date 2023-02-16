import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { deleteAuthor } from 'models/experts/asyncActions';
import { useActions } from 'shared/hooks/useActions';
import { useStyles } from './styles/AuthorsTable.styles';
import i18n, { langTokens } from '../../../locales/localizationInit';

interface IAuthorsDelDialogProps {
  id: number;
  fullName: string;
  isAllowedToDelete?: boolean;
}

const AuthorsDeletingDialog: React.FC<IAuthorsDelDialogProps> = (props) => {
  const classes = useStyles();
  const { id, fullName, isAllowedToDelete } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [boundDeleteAuthor] = useActions([deleteAuthor]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    boundDeleteAuthor({ id });
    setOpenDialog(false);
  };

  return (
    <>
      <IconButton
        aria-label="delete profile"
        onClick={handleOpenDialog}
        className={classes.deleteButton}
        disabled={!isAllowedToDelete}
      >
        <DeleteOutlined />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        PaperProps={{ classes: { root: classes.dialogSection } }}
      >
        <DialogTitle className={classes.dialogTitle} id="dialog-title">
          {i18n.t(langTokens.admin.removeAuthor)}
        </DialogTitle>
        <DialogTitle className={classes.dialogFullname} id="dialog-fullname">
          {i18n.t(`${fullName} (${id})`)}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText
            className={classes.dialogContentText}
            id="dialog-description"
          >
            {i18n.t(langTokens.admin.removeAuthorAftermath)}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            className={classes.dialogActionsButtons}
            onClick={handleCloseDialog}
          >
            {i18n.t(langTokens.admin.confirmRemoveAuthor)}
          </Button>
          <Button
            className={classes.dialogActionsButtons}
            onClick={handleCloseDialog}
          >
            {i18n.t(langTokens.admin.discardRemoveAuthor)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AuthorsDeletingDialog;
