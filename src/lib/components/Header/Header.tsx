import React from 'react';
import { Box, Container, Toolbar, Typography } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from './Header.styles';
import { PostCreationMenu } from './PostCreationMenu';
import { RootStateType } from '../../../store/rootReducer';
import { AccountMenu } from './AccountMenu';
import { LoginModal } from '../Users/LoginModal';

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

const Header: React.FC = () => {
  const classes = useStyles();
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  return (
    <div id="header" className={classes.header}>
      <Container className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <Box display="flex">
            <Link to="/">
              <Typography className={classes.logo} variant="h1">
                Доказові
              </Typography>
            </Link>

            <Box className={classes.tabs}>
              {navElems.map((item) => (
                <NavLink
                  to={item.url}
                  key={item.id}
                  className={classes.tab}
                  exact
                >
                  <Typography variant="h5" className={classes.tabLabel}>
                    {item.label}
                  </Typography>
                </NavLink>
              ))}
            </Box>
          </Box>

          <Box className={classes.actionsContainer}>
            {user && <PostCreationMenu />}

            {user ? <AccountMenu /> : <LoginModal />}
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
};

export default Header;
