import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Grid, Link, Toolbar, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { useStyles } from './Header.styles';
import { DropDownMenu } from './DropDownMenu';

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="header">
      <Grid container>
        <Grid item xs={12}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.logo}>
              <LocalHospitalIcon fontSize="large" />
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
              >
                Dokazovi
              </Typography>
            </div>

            <div className={classes.logIn}>
              <AccountCircleIcon fontSize="large" />
              <Link href="/">Log in</Link>/<Link href="/">Register</Link>
            </div>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <List className={classes.generalNavigation}>
            <ListItem>
              <Link component={RouterLink} to="/">
                Головна
              </Link>
            </ListItem>

            <ListItem>
              <Link component={RouterLink} to="/direction/covid-19" noWrap>
                Covid-19
              </Link>
            </ListItem>

            <ListItem>
              <DropDownMenu />
            </ListItem>
            <ListItem>
              <Link href="/">Експерти</Link>
            </ListItem>
            <ListItem>
              <Link href="/">Переклади</Link>
            </ListItem>
            <ListItem>
              <Link href="/">Навчання</Link>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
