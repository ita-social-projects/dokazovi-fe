import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, MenuItem, Menu } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { archiveAdminPost } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { useStyles } from './styles/ActionButtons.styles';

interface IActionButtons {
  id: number;
}

const ActionButtons: React.FC<IActionButtons> = ({ id }) => {
  const classes = useStyles();
  const [boundedArchiveAdminPost] = useActions([archiveAdminPost]);
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

  const handleArchiveButtonClick = (idx: number) => {
    boundedArchiveAdminPost({ idx });
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
          <MenuItem onClick={handleButtonClick}>Редагувати</MenuItem>
        </Link>
        <MenuItem onClick={() => handleArchiveButtonClick(id)}>
          Архівувати
        </MenuItem>
        <MenuItem onClick={handleButtonClick}>Змінити дату публікації</MenuItem>
        <MenuItem onClick={handleButtonClick}>Змінити автора</MenuItem>
        <MenuItem onClick={handleButtonClick}>
          Змінити кількість переглядів
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionButtons;
