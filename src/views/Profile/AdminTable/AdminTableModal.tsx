import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DialogContent } from '@material-ui/core';
import { langTokens } from '../../../locales/localizationInit';
import { useStyles } from '../styles/ViewCountModal.styles';
import { setFakePostViewsCounter } from '../../../old/lib/utilities/API/api';
import { IFakeView } from '../../../models/adminLab/types';

export interface ISimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  editViews?: (payload: IFakeView) => void;
  deletePost?: (payload: { id: number }) => void;
}

export const AdminTableModal: React.FC<ISimpleDialogProps> = (props) => {
  const { editViews, isOpen, onClose, postId } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const [viewCount, setViewCount] = React.useState(0);

  const handleClose = () => {
    onClose();
  };

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
  };

  const handleViewCountEdit = async (
    id: number,
    modifiedViewsCounter: number,
  ): Promise<unknown> => {
    try {
      const response = await setFakePostViewsCounter(id, modifiedViewsCounter);
      // editViews({ id, modifiedViewsCounter });
      handleClose();
      return response;
    } catch (error) {
      return getErrorMessage(error);
    }
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
          value={viewCount.toString()}
          onChange={(event) => setViewCount(Number(event.target.value))}
          InputProps={{
            disableUnderline: true,
          }}
          className={classes.viewsInput}
        />
        <Box className={classes.modalButtons}>
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
            onClick={() => handleViewCountEdit(postId, viewCount)}
          >
            {t(langTokens.admin.save)}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
