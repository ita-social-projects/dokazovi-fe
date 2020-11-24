import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Grid, Link, Toolbar, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import ListItems from './ListItems';
import { useStyles } from './Header.styles';

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
                <ListItems id='' label=''/>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
