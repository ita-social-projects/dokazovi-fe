import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, MenuItem, Menu } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { archiveAdminPost, editFakeViewCount } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { useStyles } from './styles/ActionButtons.styles';
import { langTokens } from '../../../locales/localizationInit';
import { ViewCountModal } from './ViewCountModal';
import { AdminTableModalContainer } from './AdminTableModalContainer';

interface IActionButtons {
  id: number;
}

interface IModalOptions {
  option: (...params: any[]) => void;
}

enum Options {
  editViewCount,
  deletePost,
}

const ActionButtons: React.FC<IActionButtons> = ({ id }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [boundedArchiveAdminPost] = useActions([archiveAdminPost]);
  const [boundEditViews] = useActions([editFakeViewCount]);
  const [actionOption, setActionOption] = useState(null);
  const editPostLink = `/edit-post?id=${id}`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [isModalShown, setIsModalShown] = React.useState<boolean>(false);

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

  const handleHideModal = () => {
    setIsModalShown(false);
    handleCloseMenu();
  };

  const handleShowModal = (option: number) => {
    setIsModalShown(true);
    adminTableModalContainer(option);
    handleCloseMenu();
  };
  console.log('hello');

  const adminTableModalContainer = (option: number) => {
    const actionOption = option ? boundEditViews : boundEditViews;

    return (
      <AdminTableModalContainer
        isOpen={isModalShown}
        onClose={handleHideModal}
        postId={id}
        option={actionOption}
      />
    );
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
        <MenuItem onClick={() => handleShowModal(Options.editViewCount)}>
          {t(langTokens.admin.changeViewsCount)}
        </MenuItem>
        <MenuItem onClick={handleButtonClick}>
          {t(langTokens.admin.returnToAuthor)}
        </MenuItem>
        <MenuItem onClick={() => handleShowModal(Options.deletePost)}>
          Delete article
        </MenuItem>
      </Menu>
      {/* <ViewCountModal
        isOpen={isModalShown}
        onClose={handleHideModal}
        postId={id}
        editViews={boundEditViews}
      /> */}
      {adminTableModalContainer(actionOption)}
      {/* <AdminTableModalContainer
        isOpen={isModalShown}
        onClose={handleHideModal}
        postId={id}
        action={editViews}
        // ниже в свою функцию можешь сразу передать айди, мне он нужен чуть дальше
        // deletePost={() => deleteHandler(id)}
        deletePost={() => null}
      /> */}
    </>
  );
};

export default ActionButtons;
