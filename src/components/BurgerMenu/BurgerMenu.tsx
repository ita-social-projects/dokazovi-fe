import React from 'react';
import {
  Drawer,
  Hidden,
  IconButton,
  List,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { langTokens } from '../../locales/localizationInit';
import { IHeaderProps } from '../Header/types';
import { useStyles } from './BurgerMenuSyle';
import { navElements } from '../../old/lib/components/Footer/Footer';

export interface IBurgerMenuProps {
  navigation: IHeaderProps[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (b: boolean) => void;
}

export const BurgerMenu: React.FC<IBurgerMenuProps> = ({
  navigation,
  setMobileMenuOpen,
  mobileMenuOpen,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      <IconButton
        data-testid="menuButton"
        className={classes.icon}
        aria-label="Open drawer"
        edge="start"
        onClick={handleDrawerToggle}
      >
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      <Hidden>
        <Drawer
          classes={{ paper: classes.root }}
          variant="temporary"
          anchor="left"
          open={mobileMenuOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.list}>
            <Typography className={classes.header} variant="h1">
              {t(langTokens.common.projectName)}
            </Typography>
            <List>
              {navigation.map((item) => (
                <NavLink
                  className={classes.link}
                  onClick={handleDrawerToggle}
                  to={item.url}
                  key={item.id}
                  exact
                >
                  <Typography className={classes.headerLinks} variant="h5">
                    {item.label}
                  </Typography>
                </NavLink>
              ))}
              {navElements.map((item) => (
                <NavLink
                  className={classes.link}
                  onClick={handleDrawerToggle}
                  to={item.url}
                  key={item.id}
                  exact
                >
                  <Typography className={classes.footerLinks} component="span">
                    {item.label}
                  </Typography>
                </NavLink>
              ))}
            </List>
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
};
