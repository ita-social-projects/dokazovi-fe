/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Menu, MenuItem, MenuProps, withStyles } from '@material-ui/core';

export const StyledMenu = withStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.common.black,
    borderRadius: 0,
    border: '1px solid',
    borderColor: theme.palette.common.white,
  },
  list: {
    padding: 0,
    '& a:last-child li': {
      border: 'none',
    },
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
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.action.hover,
      background: 'none',
    },
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}))(MenuItem);
