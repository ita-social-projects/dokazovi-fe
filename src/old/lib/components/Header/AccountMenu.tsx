import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography, Avatar } from '@material-ui/core';
import { useStyles } from './AccountMenu.styles';
import { StyledMenu, StyledMenuItem } from '../Menu/StyledMenu';
import { signOutAction, getUserAsyncAction } from '../../../store/user';
import { useActions } from '../../hooks/useActions';
import { AuthContext } from '../../../provider/AuthProvider/AuthContext';
import { selectCurrentUser } from '../../../store/user/selectors';
import { AccountIcon } from '../icons/AccountIcon';

export const AccountMenu: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { authenticated } = useContext(AuthContext);
  const { removeAuthorization } = useContext(AuthContext);
  const [boundSignOutAction] = useActions([signOutAction]);
  const [boundGetUserAsyncAction] = useActions([getUserAsyncAction]);

  const onLogoutHandler = () => {
    boundSignOutAction();
    removeAuthorization();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (authenticated) {
      boundGetUserAsyncAction();
    }
  }, [authenticated]);

  if (!user.data) {
    return null;
  }

  return (
    <>
      <Button
        color="primary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
      >
        {user.data ? (
          <Avatar
            alt={`${user.data.firstName} ${user.data.lastName}`}
            className={classes.avatar}
            src={user.data.avatar}
          />
        ) : (
          <AccountIcon className={classes.avatar} />
        )}
        <Typography className={classes.name} variant="h5">
          {user.data && user.data.firstName}
        </Typography>
      </Button>

      <StyledMenu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <StyledMenuItem onClick={onLogoutHandler}>
          <Typography variant="button" color="inherit">
            Вийти
          </Typography>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};
