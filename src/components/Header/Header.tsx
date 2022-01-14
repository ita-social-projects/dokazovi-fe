/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Menu,
  MenuItem,
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
  // const [searchInput, setSearchInput] = useState<null | Element>(null);
  const [searchInput, setSearchInput] = useState<boolean>(false);
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
      setSearchInput(false);
    }
  }, [mobile]);

  const wrapperRef = useRef(null);

  // useEffect(() => {
  //   /**
  //    * Alert if clicked on outside of element
  //    */
  //   const handleClickOutside = (event: { target: { value: any; name: string } }) => {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       console.log('clicked outside');
  //       // setState();
  //     }
  //   };

  //   // Bind the event listener
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [wrapperRef]);

  //   const outsideClicker = () => {

  //     useOutsideClick(wrapperRef);

  //     return <div ref={wrapperRef}></div>;
  // }

  const renderMobileToolbar = () => {
    return (
      <>
        {mobile && (
          <BurgerMenu
            navigation={navElems}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={(b) => setMobileMenuOpen(b)}
          />
        )}

        {!searchInput ? (
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
                onClick={() => setSearchInput((prev) => !prev)}
                ref={wrapperRef}
              >
                <SearchIcon className={classes.searchIcon} />
              </Button>
            )}
          </>
        ) : (
          mobile && (
            <TextField
              fullWidth
              variant="standard"
              className={classes.searchInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon className={classes.searchInputIcon} />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />
          )
        )}
      </>
    );
  };

  return (
    <Slide in={!mobile || visible} timeout={transitionDuration}>
      <div
        id="header"
        className={mobile ? classes.headerMobile : classes.header}
      >
        <Container className={classes.container}>
          <Toolbar className={classes.toolbar}>
            <Box display="flex" className={classes.toolbarWrapper}>
              {renderMobileToolbar()}

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
                </>
              )}
            </Box>

            {/* {!mobile && (
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
            )} */}

            {/* {mobile && (
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
                    <div>Hello</div>
                    <SearchIcon className={classes.searchInputIcon} />
                  </MenuItem>
                </Menu>

              </div>
            )} */}

            {/* {mobile && (
              <div>
                {searchInput ?
                  <TextField
                    variant="standard"
                    // label='Textfield'
                    className={classes.searchInput}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon className={classes.searchInputIcon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  :
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={() => setSearchInput(prev => !prev)}
                    ref={wrapperRef}
                  >
                    <SearchIcon className={classes.searchIcon} />

                  </Button>

                }

              </div>
            )} */}
          </Toolbar>
        </Container>
      </div>
    </Slide>
  );
};
