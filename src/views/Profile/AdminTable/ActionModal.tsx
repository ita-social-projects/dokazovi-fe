import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, DialogActions, DialogContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import { langTokens } from '../../../locales/localizationInit';

export interface IModalSettings {
  title?: string;
  content?: string | JSX.Element;
  onConfirmButtonClick?: () => void;
}

interface IActionButtonsModal {
  open: boolean;
  onClose: () => void;
  modal: IModalSettings;
}

const ActionModal: React.FC<IActionButtonsModal> = ({
  open,
  onClose,
  modal,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      {modal.title && <DialogTitle>{modal.title}</DialogTitle>}
      {modal.content && <DialogContent>{modal.content}</DialogContent>}
      <DialogActions>
        <Button onClick={modal.onConfirmButtonClick}>
          {t(langTokens.common.yes)}
        </Button>
        <Button onClick={onClose}>{t(langTokens.common.no)}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
