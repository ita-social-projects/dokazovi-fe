import React from 'react';
import { Link } from 'react-router-dom';
import { Button, MenuItem, Menu } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { StatusesForActions } from '../../../models/adminLab/types';
import { deleteAdminPost, setPostStatus } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { useStyles } from './styles/ActionButtons.styles';
import { langTokens } from '../../../locales/localizationInit';

interface IActionButtons {
  id: number;
}

const ActionButtons: React.FC<IActionButtons> = ({ id }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [boundedDeleteAdminPost, boundedSetPostStatus] = useActions([deleteAdminPost, setPostStatus]);
  const editPostLink = `/edit-post?id=${id}`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

  const handleDeleteButtonClick = (idx: number) => {
    boundedDeleteAdminPost({ id: idx });
    handleCloseMenu();
  };

  const handelSetPostStatus = (idx: number, postStatus: number)=>{
    boundedSetPostStatus({ id: idx, postStatus });
    handleCloseMenu();
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
        <MenuItem onClick={() => handleDeleteButtonClick(id)}> { /* Тут теперь удаление поста */  }
          {t(langTokens.admin.delete)}
        </MenuItem>
        <MenuItem onClick={handleButtonClick}>
          {t(langTokens.admin.changePublicationDate)}
        </MenuItem>
        <MenuItem onClick={handleButtonClick}>
          {t(langTokens.admin.changeViewsCount)}
        </MenuItem>
        <MenuItem onClick={() => handelSetPostStatus(id, StatusesForActions.DRAFT)}>
          {t(langTokens.admin.returnToAuthor)}
        </MenuItem>
        <MenuItem onClick={() => handelSetPostStatus(id, StatusesForActions.ARCHIVED)}>
          {t(langTokens.admin.archive)}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionButtons;
