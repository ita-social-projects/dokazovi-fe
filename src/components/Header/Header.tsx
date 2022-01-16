import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Slide,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
} from '@material-ui/core';
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
import { useActions } from '../../shared/hooks';
import {
  makeHeaderInvisible,
  makeHeaderVisible,
} from '../../models/headerVisibility';

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
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const { mobile } = useContext(ScreenContext);

  const [boundMakeHeaderVisible, boundMakeHeaderInvisible] = useActions([
    makeHeaderVisible,
    makeHeaderInvisible,
  ]);

  const transitionDuration = {
    enter: 200,
    exit: 200,
  };
  if (mobile) {
    window.onscroll = () => {
      setOldPageOffsetY(visualViewport.pageTop);
      if (visualViewport.pageTop >= oldPageOffsetY) {
        setVisible(false);
        boundMakeHeaderInvisible();
      } else {
        setVisible(true);
        boundMakeHeaderVisible();
      }
    };
  }

  useEffect(() => {
    if (!mobile) {
      setIsSearchVisible(false);
    }
  }, [mobile]);

  return (
    <Slide in={!mobile || visible} timeout={transitionDuration}>
      <div
        id="header"
        className={mobile ? classes.headerMobile : classes.header}
      >
        <Container className={classes.container}>
          <Toolbar className={classes.toolbarWrapper}>
            <Box
              display="flex"
              className={mobile ? classes.toolbarMobile : classes.toolbar}
            >
              {mobile && (
                <BurgerMenu
                  navigation={navElems}
                  mobileMenuOpen={mobileMenuOpen}
                  setMobileMenuOpen={(b) => setMobileMenuOpen(b)}
                />
              )}

              {!isSearchVisible ? (
                <>
                  <Box display="flex">
                    <Link to="/">
                      <Typography
                        className={mobile ? classes.logoMobile : classes.logo}
                        variant="h1"
                      >
                        {t(langTokens.common.projectName)}
                      </Typography>
                    </Link>
                  </Box>
                  {mobile && (
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={() => setIsSearchVisible((prev) => !prev)}
                    >
                      <SearchIcon className={classes.searchIcon} />
                    </Button>
                  )}
                </>
              ) : (
                mobile &&
                isSearchVisible && (
                  <>
                    <div
                      className={classes.backdrop}
                      onClick={() => setIsSearchVisible(false)}
                    />
                    <TextField
                      fullWidth
                      variant="standard"
                      className={classes.searchInput}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon className={classes.searchInput} />
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                      }}
                    />
                  </>
                )
              )}

              {!mobile && (
                <>
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
                </>
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
          </Toolbar>
        </Container>
      </div>
    </Slide>
  );
};
