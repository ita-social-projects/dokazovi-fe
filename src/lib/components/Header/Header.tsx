import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Grid, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from './Header.styles';
import { PostCreationMenu } from '../PostCreationMenu';
import { LoginModal } from '../Modals/LoginModal';
import { RootStateType } from '../../../store/rootReducer';
import LogOutButton from '../LogOutButton';

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
    id: 'covid-19',
    label: 'Covid-19',
    url: '/direction/covid-19',
  },
  {
    id: 'directions',
    label: 'Напрямки',
    url: '/direction',
  },
  {
    id: 'experts',
    label: 'Експерти',
    url: '/experts',
  },
  // {
  //   id: 'translates',
  //   label: 'Переклади',
  // },
];

const Header: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();
  const { user } = useSelector((state: RootStateType) => state.currentUser);
  const pathName = useLocation().pathname;

  const activeTab = navElems.find((elem) => elem.url === pathName);
  const [tabState, setTabState] = useState(activeTab?.id || navElems[0].id);

  const handleTabChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    routeName: string,
  ) => {
    const navElem = navElems.find((elem) => elem.id === routeName);

    if (navElem) {
      setTabState(navElem.id);
      history.push(navElem.url);
    }
  };

  return (
    <div className="header">
      <Grid container>
        <Grid item xs={12}>
          <Toolbar className={classes.toolbar}>
            <Link to="/">
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
            </Link>
            {user && (
              <div className={classes.postCreationMenu}>
                <PostCreationMenu />
              </div>
            )}

            <div className={classes.logIn}>
              <AccountCircleIcon fontSize="large" />
              {user ? <LogOutButton /> : <LoginModal />}
            </div>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            value={tabState}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="disabled tabs example"
          >
            {navElems.map((item) => (
              <Tab label={item.label} value={item.id} key={item.id} />
            ))}
          </Tabs>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
