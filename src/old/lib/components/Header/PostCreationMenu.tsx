import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';
import { StyledMenu, StyledMenuItem } from '../Menu/StyledMenu';
import { combineClassNames } from '../../utilities/classNames';

const menuItems = [
  {
    id: 'article',
    label: 'статтю',
    url: '/create-article',
  },
  {
    id: 'dopys',
    label: 'допис',
    url: '/create-note',
  },
  {
    id: 'video',
    label: 'відео',
    url: '/create-video',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      width: 150,
      height: 35,
      padding: theme.spacing(1, 3),
      background: 'none',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main,
      justifyContent: 'space-between',
      '&:hover, &.active': {
        background: 'none',
        borderColor: theme.palette.common.white,
        color: theme.palette.common.white,
        fill: theme.palette.common.white,
      },
      '&.active svg': {
        transform: 'rotate(180deg)',
      },
    },
    label: {
      color: 'inherit',
    },
    icon: {
      fill: 'inherit',
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    menu: {
      width: 150,
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
    <div className={classes.container}>
      <Button
        aria-controls="post-creation-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        classes={{
          root: combineClassNames(classes.button, {
            active: Boolean(anchorEl),
          }),
          label: classes.label,
        }}
      >
        <Typography variant="h5" color="inherit">
          Створити...
        </Typography>
        <ArrowDropDownIcon className={classes.icon} />
      </Button>
      <StyledMenu
        classes={{ paper: classes.menu }}
        id="post-creation-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <Link to={item.url} key={item.id}>
            <StyledMenuItem onClick={handleClose}>
              <Typography variant="h5" color="inherit">
                {item.label}
              </Typography>
            </StyledMenuItem>
          </Link>
        ))}
      </StyledMenu>
    </div>
  );
};
