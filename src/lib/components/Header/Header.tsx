import React, { useContext, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Box, Container, Toolbar, Typography } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { useStyles } from './Header.styles';
import { PostCreationMenu } from './PostCreationMenu';
import { LoginModal } from '../Users/LoginModal';
import { AccountMenu } from './AccountMenu';
import { AuthContext } from '../../../provider/AuthProvider/AuthContext';
import { getUserAsyncAction } from '../../../store/user';
import { useActions } from '../../hooks/useActions';

interface IHeaderProps {
  id: string;
  label: string;
  url: string;
}

export const navElems: IHeaderProps[] = [
  {
    id: 'main',
    label: 'Головна',
    url: '/',
  },
  {
    id: 'materials',
    label: 'Матеріали',
    url: '/materials',
  },
  {
    id: 'experts',
    label: 'Автори',
    url: '/experts',
  },
];

export const Header: React.FC = () => {
  const classes = useStyles();
  const { authenticated } = useContext(AuthContext);
  const [boundGetUserAsyncAction] = useActions([getUserAsyncAction]);

  useEffect(() => {
    if (authenticated) {
      boundGetUserAsyncAction();
    }
  }, [authenticated]);

  return (
    <Container>
      <div id="header">
        <Toolbar className={classes.header}>
          <Box display="flex">
            <Link to="/">
              <Typography className={classes.logo} variant="h1">
                Доказові
              </Typography>
            </Link>

            <Typography className={classes.subtitle} variant="subtitle2">
              <span>Обгрунтовані</span>
              <span>медичні погляди</span>
            </Typography>
          </Box>

          <Box display="flex">
            <Link to="/" className={classes.community}>
              <Typography variant="h5">Про нашу спільноту</Typography>
            </Link>

            {authenticated && (
              <div className={classes.postCreationMenu}>
                <PostCreationMenu />
              </div>
            )}

            <SearchIcon className={classes.search} fontSize="large" />

            {authenticated ? <AccountMenu /> : <LoginModal />}
          </Box>
        </Toolbar>

        <Box className={classes.tabs}>
          {navElems.map((item) => (
            <NavLink to={item.url} key={item.id} className={classes.tab} exact>
              <Typography variant="h5" className={classes.tabLabel}>
                {item.label}
              </Typography>
            </NavLink>
          ))}
        </Box>
      </div>
    </Container>
  );
};
