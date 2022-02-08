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
import { AdminTableModal } from './AdminTableModal';
import { editFakeViewCount } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';

export interface ISimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  editViews?: (payload: IFakeView) => void;
  deletePost?: (payload: IFakeView) => void;
  option: () => void;
}

export const AdminTableModalContainer: React.FC<ISimpleDialogProps> = (
  props,
) => {
  const { isOpen, onClose, postId } = props;
  const [boundEditViews] = useActions([editFakeViewCount]);
  const { t } = useTranslation();
  const classes = useStyles();
  const [viewCount, setViewCount] = React.useState(0);

  return (
    <AdminTableModal
      isOpen={isOpen}
      onClose={() => onClose()}
      postId={postId}
      editViews={() => null}
    />
  );
};
