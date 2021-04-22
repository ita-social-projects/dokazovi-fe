import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useStyles } from './AccountMenu.styles';
import { StyledMenu, StyledMenuItem } from '../Menu/StyledMenu';
import { signOutAction } from '../../../store/user';
import { AuthContext } from '../../../authProvider/AuthContext';

export const AccountMenu: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { removeToken } = useContext(AuthContext);

  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(signOutAction());
    removeToken();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        className={classes.avatar}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <StyledMenu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={onLogoutHandler}>
          <Typography variant="button">Вийти</Typography>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};
