import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
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

  const [searchInput, setSearchInput] = useState<null | Element>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const { mobile } = useContext(ScreenContext);

  return (
    <div id="header" className={classes.header}>
      <Container className={classes.container}>
        <Toolbar className={classes.toolbar}>
          {mobile && <BurgerMenu
            navigation={navElems}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={(b)=>setMobileMenuOpen(b)}
          />}
          <Box display="flex">
            {!mobileMenuOpen && <Link to='/'>
              <Typography className={mobile ? classes.logoMobile : classes.logo} variant='h1'>
                {t(langTokens.common.projectName)}
              </Typography>
            </Link>}
            {!mobile && <Box className={classes.tabs}>
              {navElems.map((item) => (
                <NavLink
                  to={item.url}
                  key={item.id}
                  className={classes.tab}
                  exact
                >
                  <Typography variant='h5' className={classes.tabLabel}>
                    {item.label}
                  </Typography>
                </NavLink>
              ))}
            </Box>}
          </Box>
          {!mobile && <Box className={classes.actionsContainer}>
            {authenticated && <PostCreationMenu />}
            {authenticated ? (
              <AccountMenu />
            ) : (
              <Route path='/opendoctorgate'>
                <LoginModal />
              </Route>
            )}
          </Box>}
          {mobile && <div>
            <Button aria-controls="simple-menu" aria-haspopup="true"
                    onClick={(e)=>setSearchInput(e.currentTarget)}>
              <SearchIcon className={classes.searchIcon} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={searchInput}
              keepMounted
              open={Boolean(searchInput)}
              onClose={()=>setSearchInput(null)}
            >
              <MenuItem>
                <input className={classes.searchInput}/>
                <SearchIcon/>
              </MenuItem>
            </Menu>
          </div>}
        </Toolbar>
      </Container>
    </div>
  );
};
