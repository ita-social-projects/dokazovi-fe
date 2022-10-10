import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { useStyles } from './styles/AuthorsTable.styles';

interface IAuthorsDeletingDialogProps {
  id: number;
  fullName: string;
  isAllowedToDelete?: boolean;
}

const AuthorsDeletingDialog: React.FC<IAuthorsDeletingDialogProps> = (
  props,
) => {
  const { id, fullName, isAllowedToDelete } = props;
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const handleChanges = (type: string, value: boolean) => {
    switch (type) {
      case 'dialog':
        setOpenDialog(value);
        break;
      case 'tooltip':
        setOpenTooltip(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Tooltip
        open={openTooltip && !isAllowedToDelete}
        onClose={() => handleChanges('tooltip', false)}
        onOpen={() => handleChanges('tooltip', true)}
        placement="bottom-end"
        title={
          'Дозволяється видаляти тільки тих авторів, які не мають постів або всі пости мають статус "Чернетка"!'
        }
      >
        <div>
          <IconButton
            aria-label="delete profile"
            onClick={() => handleChanges('dialog', true)}
            className={classes.deleteButton}
            disabled={!isAllowedToDelete}
          >
            <DeleteOutlined />
          </IconButton>
        </div>
      </Tooltip>
      <Dialog
        open={openDialog}
        onClose={() => handleChanges('dialog', false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        PaperProps={{ classes: { root: classes.dialogSection } }}
      >
        <DialogTitle className={classes.dialogTitle} id="dialog-title">
          Ви насправді хочете видалити автора?
        </DialogTitle>
        <DialogTitle className={classes.dialogFullname} id="dialog-fullname">
          {`${fullName} (${id})`}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText
            className={classes.dialogContentText}
            id="dialog-description"
          >
            {`Після підтвердження даної дії всі чернетки автора будуть видалені
            та автора не буде відображатися у "Список авторів"`}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            className={classes.dialogActionsButtons}
            onClick={() => handleChanges('dialog', false)}
          >
            ТAK
          </Button>
          <Button
            className={classes.dialogActionsButtons}
            onClick={() => handleChanges('dialog', false)}
          >
            Ні
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AuthorsDeletingDialog;
