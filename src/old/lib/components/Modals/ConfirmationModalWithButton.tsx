import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, CircularProgress, IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../../../locales/localizationInit';

export interface IConfirmationModalWithButtonProps {
  message: string | JSX.Element;
  buttonText?: string;
  buttonIcon?: JSX.Element;
  onConfirmButtonClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const ConfirmationModalWithButton: React.FC<IConfirmationModalWithButtonProps> = ({
  message,
  buttonText,
  buttonIcon,
  onConfirmButtonClick,
  loading,
  disabled,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div>
      {buttonIcon && (
        <IconButton
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
        <DialogTitle>{message}</DialogTitle>
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => {
              onConfirmButtonClick();
              setOpen(false);
            }}
            color="primary"
          >
            {t(langTokens.common.yes)}
          </Button>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            {t(langTokens.common.no)}
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};
