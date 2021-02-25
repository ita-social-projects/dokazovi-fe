import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Box, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from './Header.styles';
import { PostCreationMenu } from '../PostCreationMenu';
import { LoginModal } from '../Modals/LoginModal';
import { RootStateType } from '../../../store/rootReducer';
import { AccountMenu } from './AccountMenu';

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
    <div id="header" className={classes.root}>
      <Toolbar className={classes.header}>
        <Box display="flex">
          <Link to="/">
            <Typography className={classes.logo} variant="h1">
              Доказові
            </Typography>
          </Link>

          <Typography className={classes.subtitle} variant="subtitle1">
            <span>Обгрунтовані</span>
            <span>медичні погляди</span>
          </Typography>
        </Box>

        <Box display="flex">
          <Link to="/" className={classes.community}>
            <Typography variant="body2">Про нашу спільноту</Typography>
          </Link>

          {user && (
            <div className={classes.postCreationMenu}>
              <PostCreationMenu />
            </div>
          )}

          <SearchIcon className={classes.search} fontSize="large" />

          {user ? <AccountMenu /> : <LoginModal />}
        </Box>
      </Toolbar>

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
    </div>
  );
};

export default Header;
