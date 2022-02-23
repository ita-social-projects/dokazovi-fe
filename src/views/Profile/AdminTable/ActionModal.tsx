import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Button, DialogContent, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import { langTokens } from '../../../locales/localizationInit';
import { useStyles } from './styles/ActionModal.styles';

export interface IModalSettings {
  title?: string;
  content?: string | JSX.Element;
  onConfirmButtonClick?: () => void;
}

interface IActionModal {
  open: boolean;
  onClose: () => void;
  modal: IModalSettings;
}

const ActionModal: React.FC<IActionModal> = ({ open, onClose, modal }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      {modal.title && (
        <DialogTitle className={classes.dialogTitleContainer}>
          <Typography className={classes.modalText}>{modal.title}</Typography>
        </DialogTitle>
      )}
      {modal.content && <DialogContent>{modal.content}</DialogContent>}
      <Box className={classes.btnContainer}>
        <Button
          onClick={modal.onConfirmButtonClick}
          className={[classes.btnConfirm, classes.btn].join(' ')}
        >
          {t(langTokens.common.yes)}
        </Button>
        <Button
          onClick={onClose}
          autoFocus
          className={[classes.btnCancel, classes.btn].join(' ')}
        >
          {t(langTokens.common.no)}
        </Button>
      </Box>
    </Dialog>
  );
};

export default ActionModal;
