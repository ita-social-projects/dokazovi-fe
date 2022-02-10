import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, MenuItem, Menu, Box } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { archiveAdminPost, removePost } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { useStyles } from './styles/ActionButtons.styles';
import { langTokens } from '../../../locales/localizationInit';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { deletePostById } from '../../../old/lib/utilities/API/api';

interface IActionButtons {
  id: number;
  status: string;
}

const ActionButtons: React.FC<IActionButtons> = ({ id, status }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [boundedArchiveAdminPost, boundedRemovePost] = useActions([
    archiveAdminPost,
    removePost,
  ]);
  const editPostLink = `/edit-post?id=${id}`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteEl, setDeleteEl] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = () => {
    handleCloseMenu();
  };

  const handleArchiveButtonClick = (idx: number) => {
    boundedArchiveAdminPost({ id: idx });
    handleCloseMenu();
  };

  const handleDeleteButtonClick = () => {
    setDeleteEl(true);
    handleCloseMenu();
  };

  const handlePostDeletion = async () => {
    try {
      const response = await deletePostById(Number(id));
      if (response.data.success) {
        toast.success(`${t(langTokens.materials.materialDeletedSuccess)}!`);
      }
      boundedRemovePost(Number(id));
    } catch (e) {
      toast.success(`${t(langTokens.materials.materialDeletedFail)}.`);
    }
  };

  return (
    <>
      <Button
        className={classes.mainButton}
        id="actionMenu"
        startIcon={<MoreVert />}
        aria-controls="positioned-menu"
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleOpenMenu}
      />
      <Menu
        className={classes.menuRoot}
        id="positioned-menu"
        aria-labelledby="actionMenu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transitionDuration={400}
      >
        <Link to={editPostLink} target="_blank">
          <MenuItem onClick={handleButtonClick}>
            {t(langTokens.admin.edit)}
          </MenuItem>
        </Link>
        <MenuItem onClick={() => handleArchiveButtonClick(id)}>
          {t(langTokens.admin.archive)}
        </MenuItem>
        <MenuItem onClick={handleButtonClick}>
          {t(langTokens.admin.changePublicationDate)}
        </MenuItem>
        <MenuItem onClick={handleButtonClick}>
          {t(langTokens.admin.changeViewsCount)}
        </MenuItem>
        <MenuItem onClick={handleButtonClick}>
          {t(langTokens.admin.returnToAuthor)}
        </MenuItem>
        {status !== 'MODERATION_SECOND_SIGN' && (
          <MenuItem onClick={handleDeleteButtonClick}>
            {t(langTokens.admin.remove)}
          </MenuItem>
        )}
      </Menu>
      {deleteEl && (
        <DeleteConfirmationModal
          message={`${t(langTokens.materials.needToDeleteMaterial)}?`}
          onConfirmButtonClick={handlePostDeletion}
          onCancelClick={() => setDeleteEl(false)}
        />
      )}
    </>
  );
};

export default ActionButtons;
