import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../../locales/localizationInit';
import { useStyles } from '../../../old/lib/components/Modals/confirmationModalWithButton.style';

export interface IDeleteConfirmationModalProps {
  message: string | JSX.Element;
  isOpen?: boolean;
  buttonText?: string;
  buttonIcon?: JSX.Element;
  onConfirmButtonClick: () => void;
  onCancelClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const DeleteConfirmationModal: React.FC<IDeleteConfirmationModalProps> = ({
  message,
  onConfirmButtonClick,
  onCancelClick,
  isOpen,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Dialog
      open
      onClose={onCancelClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitleContainer}>
        <Typography className={classes.modalText}>{message}</Typography>
      </DialogTitle>
      <Box
        display="flex"
        justifyContent="center"
        className={classes.btnContainer}
      >
        <Button
          data-testid="confirmation-button"
          onClick={() => {
            onConfirmButtonClick();
            onCancelClick();
          }}
          color="primary"
          className={[classes.btnConfirm, classes.btn].join(' ')}
        >
          {t(langTokens.common.yes)}
        </Button>
        <Button
          onClick={() => onCancelClick()}
          color="primary"
          autoFocus
          className={[classes.btnCancel, classes.btn].join(' ')}
        >
          {t(langTokens.common.no)}
        </Button>
      </Box>
    </Dialog>
  );
};
