import React, { useContext, useState } from 'react';
import { Box, Button, Container, Input, Menu, MenuItem, Slide, Toolbar, Typography } from '@material-ui/core';
import { Link, NavLink, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './Header.styles';
import { PostCreationMenu } from './PostCreationMenu';
import { LoginModal } from '../../old/lib/components/Users/LoginModal';
import { AccountMenu } from './AccountMenu';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';
import i18n, { langTokens } from '../../locales/localizationInit';
import { IHeaderProps } from './types';
import { ScreenContext } from '../../old/provider/MobileProvider/ScreenContext';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

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

  const [visible, setVisible] = useState<boolean>(true);
  const [oldPageOffsetY, setOldPageOffsetY] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<null | Element>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const { mobile } = useContext(ScreenContext);

  const transitionDuration = {
    enter: 200,
    exit: 200,
  };

  window.onscroll = () => {
    setOldPageOffsetY(visualViewport.pageTop);
    if (
      visualViewport.pageTop >= oldPageOffsetY
    ) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <Slide in={!mobile || visible} timeout={transitionDuration}>
      <div
        id="header"
        className={mobile ? classes.headerMobile : classes.header}
      >
        <Container className={classes.container}>
          <Toolbar className={classes.toolbar}>
            {mobile && (
              <BurgerMenu
                navigation={navElems}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={(b) => setMobileMenuOpen(b)}
              />
            )}
            <Box display="flex">
              {!mobileMenuOpen && !searchInput && (
                <Link to="/">
                  <Typography
                    className={mobile ? classes.logoMobile : classes.logo}
                    variant="h1"
                  >
                    {t(langTokens.common.projectName)}
                  </Typography>
                </Link>
              )}
              {!mobile && (
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
              )}
            </Box>
            {!mobile && (
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
            )}
            {mobile && (
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => setSearchInput(e.currentTarget)}
                >
                  <SearchIcon className={classes.searchIcon} />
                </Button>
                <Menu
                  classes={{ list: classes.label, paper: classes.paper }}
                  id="simple-menu"
                  anchorEl={searchInput}
                  keepMounted
                  open={Boolean(searchInput)}
                  onClose={() => setSearchInput(null)}
                >
                  <MenuItem className={classes.searchInputWrapper}>
                    <Input
                      disableUnderline
                      className={classes.searchInput}
                      placeholder={t(langTokens.common.inputSearchPlaceholder)}
                    />
                    <SearchIcon className={classes.searchInputIcon} />
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </Container>
      </div>
    </Slide>
  );
};
