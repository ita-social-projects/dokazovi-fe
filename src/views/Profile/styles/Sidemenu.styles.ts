import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    sidemenuBody: {
      minWidth: '200px',
      top: theme.spacing(24),
      backgroundColor: '#dbdbdb',
      position: 'absolute',
      border: 'none',
    },
    sidemenuList: {
      paddingTop: '0px',
    },
  }),
  { name: 'Sidemenu' },
);
