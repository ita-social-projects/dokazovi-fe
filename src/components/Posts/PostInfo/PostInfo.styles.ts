import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      marginBottom: theme.spacing(8),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        marginBottom: theme.spacing(6),
      },
    },
    topics: {
      listStyle: 'none',
      display: 'flex',
      marginRight: '20px',
      height: '32px',
      minWidth: 'fit-content',
      [theme.breakpoints.down('sm')]: {
        margin: '0 0 30px',
        flexWrap: 'wrap',
        height: 'auto',
      },
      '& > *:not(:last-child)': {
        marginRight: '4px',
      },
      '& > li': {
        padding: '5px 12px',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.custom.colorAquaBlue,
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
          margin: '0 3px 3px 0',
          fontSize: '14px',
          lineHeight: '1,19',
        },
      },
    },

    origins: {
      listStyle: 'none',
      display: 'flex',
      marginRight: '20px',
      height: '32px',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        height: 'auto',
      },

      '& > *:not(:last-child)': {
        marginRight: '4px',
      },
      '& > li': {
        padding: '5px 12px',
        minWidth: 'fit-content',
        [theme.breakpoints.down('sm')]: {
          fontSize: '14px',
          padding: '0 15px',
          marginBottom: '5px',
        },
      },
      '& > *:first-child': {
        borderRightColor: '#ff5c00',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        [theme.breakpoints.down('sm')]: {
          paddingLeft: '0px',
        },
      },
    },

    origin: {
      color: '#ff5c00',
      cursor: 'pointer',
    },

    createdAt: {
      color: '#767676',
      borderLeftColor: '#767676',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1px',
    },

    views: {
      display: 'flex',
    },

    icon: {
      '& > svg': {
        fill: '#767676',
        marginRight: '10px',
      },
    },

    counter: {
      color: '#767676',
    },
  }),
  { name: 'PostInfo' },
);
