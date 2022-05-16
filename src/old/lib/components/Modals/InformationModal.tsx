import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './confirmationModalWithButton.style';
import { langTokens } from '../../../../locales/localizationInit';

export interface IConfirmationModalWithButtonProps {
  message: string | JSX.Element;
  loading?: boolean;
  disabled?: boolean;
  onClose: () => void;
  isOpen: boolean;
}

export const InformationModal: React.FC<IConfirmationModalWithButtonProps> = ({
  message,
  onClose,
  isOpen,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.dialogTitleContainer}>
          <Typography className={classes.modalText} style={{ maxWidth: '97%' }}>
            {message}
          </Typography>
        </DialogTitle>
        <Box
          display="flex"
          justifyContent="center"
          className={classes.btnContainer}
        >
          <Button
            onClick={onClose}
            color="primary"
            autoFocus
            style={{ marginLeft: '0' }}
            className={[classes.btnCancel, classes.btn].join(' ')}
          >
            {t(langTokens.common.close)}
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};
