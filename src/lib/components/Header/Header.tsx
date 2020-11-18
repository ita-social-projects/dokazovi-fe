import React from 'react';

import './Header.css';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import ListItems from './ListItems';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: "space-between",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    }, 
    image: {
      width: "2px",
      marginRight: "10px",
      fontSize: "10px",
    }, 
    logInBlock: {
      display: "flex",
      justifyContent: "flex-end",
    }, 
    navBar: {
      justifyContent: "space-between",
    }, 
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navBar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img className={classes.image} src="#" alt="logo"/>
          </IconButton>
          <IconButton edge="end" className={classes.logInBlock}>
            <img className={classes.image} src="#" alt="user"/>
            <Button color="inherit">Log in</Button>
            <Button color="inherit">Register</Button>
          </IconButton>
        </Toolbar>
        <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" p={1}>
          <ListItems/>
        </Box>
      </AppBar>
    </div>
  );
};

export default Header;
