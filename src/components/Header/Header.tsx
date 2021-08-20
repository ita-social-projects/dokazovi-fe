import React, { useContext } from 'react';
import { Box, Container, Toolbar, Typography } from '@material-ui/core';
import { Link, NavLink, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStyles } from './Header.styles';
import { PostCreationMenu } from './PostCreationMenu';
import { LoginModal } from '../../old/lib/components/Users/LoginModal';
import { AccountMenu } from './AccountMenu';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';
import i18n, { langTokens } from '../../locales/localizationInit';

interface IHeaderProps {
  id: string;
  label: string;
  url: string;
}

export const navElems: IHeaderProps[] = [
  {
    id: 'main',
    label: i18n.t(langTokens.common.main),
    url: '/',
  },
  {
    id: 'materials',
    label: i18n.t(langTokens.common.materials),
    url: '/materials',
  },
  {
    id: 'experts',
    label: i18n.t(langTokens.common.experts),
    url: '/experts',
  },
];

export const Header: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { authenticated } = useContext(AuthContext);

  return (
    <div id="header" className={classes.header}>
      <Container className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <Box display="flex">
            <Link to="/">
              <Typography className={classes.logo} variant="h1">
                {t(langTokens.common.projectName)}
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
            {authenticated && <PostCreationMenu />}
            {authenticated ? (
              <AccountMenu />
            ) : (
              <Route path="/opendoctorgate">
                <LoginModal />
              </Route>
            )}
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
};
