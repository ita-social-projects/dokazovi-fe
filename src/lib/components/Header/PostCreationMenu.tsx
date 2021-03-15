import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom';
import { StyledMenu, StyledMenuItem } from '../Menu/StyledMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: 150,
      height: 35,
      padding: theme.spacing(1, 3),
      backgroundColor: theme.palette.info.light,
      justifyContent: 'space-between',
      '&:hover': {
        backgroundColor: theme.palette.info.main,
      },
    },
    label: {
      color: theme.palette.common.white,
    },
    icon: {
      fill: theme.palette.common.white,
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
    <div>
      <Button
        aria-controls="post-creation-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        classes={{ root: classes.button, label: classes.label }}
      >
        Створити...
        <ArrowDropDownIcon classes={{ root: classes.icon }} />
      </Button>
      <StyledMenu
        classes={{ paper: classes.menu }}
        id="post-creation-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/create-article">
          <StyledMenuItem onClick={handleClose}>
            <Typography variant="button">Створити статтю</Typography>
          </StyledMenuItem>
        </Link>
        <Link to="/create-note">
          <StyledMenuItem onClick={handleClose}>
            <Typography variant="button">Створити допис</Typography>
          </StyledMenuItem>
        </Link>
        <Link to="/create-video">
          <StyledMenuItem onClick={handleClose}>
            <Typography variant="button">Створити відео</Typography>
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
};
