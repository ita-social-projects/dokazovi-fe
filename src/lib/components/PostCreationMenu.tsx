/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    width: '250px',
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      padding: theme.spacing(2),
      width: '250px',
      backgroundColor: 'white',
      boxShadow: 'none',
      border: '1px solid grey',
      justifyContent: 'space-between',
    },
  }),
);

export const PostCreationMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        className={classes.button}
      >
        Створити...
        <ArrowDropDownIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/create-article">
          <StyledMenuItem onClick={handleClose}>
            <ListItemText primary="Створити статтю" />
          </StyledMenuItem>
        </Link>
        <Link to="/create-note">
          <StyledMenuItem onClick={handleClose}>
            <ListItemText primary="Створити допис" />
          </StyledMenuItem>
        </Link>
        <Link to="/">
          <StyledMenuItem onClick={handleClose}>
            <ListItemText primary="Створити відео" />
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
};
