import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { DialogContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { langTokens } from '../../../locales/localizationInit';
import { useStyles } from '../styles/ViewCountModal.styles';

export interface ISimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ViewCountModal: React.FC<ISimpleDialogProps> = (props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const [viewCount, setViewCount] = React.useState(0);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={isOpen} className={classes.root}>
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant="h5">
          {t(langTokens.admin.changeViewsCount)}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          fullWidth
          variant="standard"
          type="number"
          autoFocus
          value={viewCount}
          onChange={(event) => setViewCount(Number(event.target.value))}
          InputProps={{
            disableUnderline: true,
          }}
          className={classes.viewsInput}
        />
        <Box className={classes.modalBtns}>
          <Button
            variant="text"
            className={classes.secondaryBtn}
            onClick={() => handleClose()}
          >
            {t(langTokens.admin.dismiss)}
          </Button>
          <Button
            variant="contained"
            className={classes.primaryBtn}
            disabled={viewCount < 0}
            // onClick={}
          >
            {t(langTokens.admin.save)}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
