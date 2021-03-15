/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Menu, MenuItem, MenuProps, withStyles } from '@material-ui/core';

export const StyledMenu = withStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.info.light,
    borderRadius: 0,
    borderTop: '1px solid',
    borderColor: theme.palette.common.white,
  },
}))((props: MenuProps) => (
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

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 3),
    color: theme.palette.common.white,
    '& .MuiTypography-button': {
      color: theme.palette.common.white,
    },
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
}))(MenuItem);
