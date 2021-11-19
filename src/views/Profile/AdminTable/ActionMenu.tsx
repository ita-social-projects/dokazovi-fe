import React from 'react';
import { Button, Menu } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useStyles } from './styles/ActionButtonsMenu.styles';

interface IActionButtonsMenu {
  buttonsRendered: JSX.Element[];
}

const ActionMenu: React.FC<IActionButtonsMenu> = ({ buttonsRendered }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
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
        onClick={handleCloseMenu}
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
        {buttonsRendered}
      </Menu>
    </>
  );
};

export default ActionMenu;
