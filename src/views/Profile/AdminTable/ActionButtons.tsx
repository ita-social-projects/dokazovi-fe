import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, MenuItem, Menu } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { archiveAdminPost } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { useStyles } from './styles/ActionButtons.styles';
import { langTokens } from '../../../locales/localizationInit';
import { ViewCountModal } from './ViewCountModal';

interface IActionButtons {
  id: number;
}

const ActionButtons: React.FC<IActionButtons> = ({ id }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [boundedArchiveAdminPost] = useActions([archiveAdminPost]);
  const editPostLink = `/edit-post?id=${id}`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [isViewCountModal, setIsViewCountModal] = React.useState<boolean>(
    false,
  );

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

  const showViewCountModal = () => {
    setIsViewCountModal(true);
    handleCloseMenu();
  };

  const hideViewCountModal = () => {
    setIsViewCountModal(false);
    handleCloseMenu();
  };

  const globalState = useSelector((store) => store);
  console.log(globalState);

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
        <MenuItem onClick={showViewCountModal}>
          {t(langTokens.admin.changeViewsCount)}
        </MenuItem>
        <MenuItem onClick={handleButtonClick}>
          {t(langTokens.admin.returnToAuthor)}
        </MenuItem>
      </Menu>
      <ViewCountModal
        isOpen={isViewCountModal}
        onClose={() => hideViewCountModal()}
        postId={id}
      />
    </>
  );
};

export default ActionButtons;
