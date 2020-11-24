import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Grid, Link, Toolbar, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { useStyles } from './Header.styles';

interface IHeaderProps {
  id: string, 
  label: string,
  url?: string,
  }

export const navElems: IHeaderProps [] = [
  {
    id: "main",
    label: "Головна",
    url: "/"
  },
  {
    id: "covid-19",
    label: "Covid-19",
    url: "direction/covid-19",
 },
 {
  id: "directions",
  label: "Напрямки",
},
{
  id: "experts",
  label: "Експерти",
},
{
  id: "translates",
  label: "Переклади",
},
{
  id: "study",
  label: "Навчання",
}
];

const Header: React.FC = () => {
  const classes = useStyles();

  const allLinks: any = navElems.map((item) => {
    return <a key={item.id} href={item.url} className={classes.items}>{item.label}</a>;
  });

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
                {allLinks}
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
