import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../../../locales/localizationInit';
import { useStyles } from './confirmationModalWithButton.style';

export interface IConfirmationModalWithButtonProps {
  message: string | JSX.Element;
  buttonText?: string;
  buttonIcon?: JSX.Element;
  onConfirmButtonClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  iconStyle?: Record<string, unknown>;
}

export const ConfirmationModalWithButton: React.FC<IConfirmationModalWithButtonProps> = ({
  message,
  buttonText,
  buttonIcon,
  onConfirmButtonClick,
  loading,
  disabled,
  iconStyle,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div data-testid="confirmation-modal">
      {buttonIcon && (
        <IconButton
          style={iconStyle}
          onClick={() => setOpen(true)}
          disabled={disabled || loading}
        >
          {!loading ? buttonIcon : <CircularProgress size={20} />}
        </IconButton>
      )}
      {buttonText && (
        <Button
          variant="contained"
          disabled={disabled || loading}
          onClick={() => setOpen(true)}
        >
          {!loading ? buttonText : <CircularProgress size={20} />}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
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
              setOpen(false);
            }}
            color="primary"
            className={[classes.btnConfirm, classes.btn].join(' ')}
          >
            {t(langTokens.common.yes)}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            autoFocus
            className={[classes.btnCancel, classes.btn].join(' ')}
          >
            {t(langTokens.common.no)}
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};
