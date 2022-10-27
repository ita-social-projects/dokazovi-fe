import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Button, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useTranslation } from 'react-i18next';
import { useStyles } from './AccountMenu.styles';
import {
  StyledMenu,
  StyledMenuItem,
} from '../../old/lib/components/Menu/StyledMenu';
import {
  getUserAsyncAction,
  selectCurrentUser,
  signOutAction,
} from '../../models/user';
import { useActions } from '../../shared/hooks';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';
import { AccountIcon } from '../../old/lib/components/icons/AccountIcon';
import { langTokens } from '../../locales/localizationInit';
import { selectAuthorities } from '../../models/authorities';
import { clearAuthoritiesAction } from '../../models/authorities/reducers';

export const AccountMenu: React.FC = () => {
  const { t } = useTranslation();

  const classes = useStyles();
  const user = useSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { authenticated } = useContext(AuthContext);
  const { removeAuthorization } = useContext(AuthContext);
  const [boundSignOutAction] = useActions([signOutAction]);
  const [boundGetUserAsyncAction] = useActions([getUserAsyncAction]);
  const [boundClearAuthorities] = useActions([clearAuthoritiesAction]);
  const authorities = useSelector(selectAuthorities).data?.includes(
    'SET_IMPORTANCE',
  );

  const onLogoutHandler = () => {
    boundSignOutAction();
    removeAuthorization();
    boundClearAuthorities();
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
        {user.data && <ArrowDropDownIcon className={classes.icon} />}
      </Button>
      <StyledMenu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <Link to="/profile">
          <StyledMenuItem onClick={handleClose}>
            <Typography variant="button" color="inherit">
              {t(langTokens.common.profile)}
            </Typography>
          </StyledMenuItem>
        </Link>
        {authorities ? (
          <Link to="/admin">
            <StyledMenuItem onClick={handleClose}>
              <Typography variant="button" color="inherit">
                {t(langTokens.common.admin)}
              </Typography>
            </StyledMenuItem>
          </Link>
        ) : null}
        <Link to="/">
          <StyledMenuItem onClick={onLogoutHandler}>
            <Typography variant="button" color="inherit">
              {t(langTokens.common.exit)}
            </Typography>
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </>
  );
};
