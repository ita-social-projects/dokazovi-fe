import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Avatar } from '@material-ui/core';
import { useStyles } from './AccountMenu.styles';
import { StyledMenu, StyledMenuItem } from '../Menu/StyledMenu';
import { logOut } from '../../../store/authSlice';
import { RootStateType } from '../../../store/rootReducer';
import { AccountIcon } from '../icons/AccountIcon';

export const AccountMenu: React.FC = () => {
  const classes = useStyles();
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const onLogoutHandler = () => {
    dispatch(logOut());
    history.push(`/`);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
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
        {user.avatar ? (
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            className={classes.avatar}
            src={user.avatar}
          />
        ) : (
          <AccountIcon className={classes.avatar} />
        )}
        <Typography className={classes.name} variant="h5">
          {user.firstName}
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
