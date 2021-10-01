import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      marginBottom: theme.spacing(8),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    topics: {
      listStyle: 'none',
      display: 'flex',
      marginRight: '20px',
      height: '32px',
      [theme.breakpoints.down('xs')]: {
        margin: '0 15px 30px',
        flexWrap: 'wrap',
        height: 'auto',
      },
      '& > *:not(:last-child)': {
        marginRight: '4px',
      },
      '& > li': {
        padding: '5px 12px',
        color: '#ffffff',
        backgroundColor: '#73DDFF',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
          margin: '3px',
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
      [theme.breakpoints.down('xs')]: {
        margin: '0 15px 30px',
        flexWrap: 'wrap',
      },

      '& > *:not(:last-child)': {
        marginRight: '4px',
      },
      '& > li': {
        padding: '5px 12px',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
          fontSize: '14px',
          padding: '5px 20px 5px 9px',
        },
      },
      '& > *:first-child': {
        borderRightColor: '#FF5C00',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
      },
    },

    origin: {
      color: '#FF5C00',
    },

    createdAt: {
      color: '#767676',
      borderLeftColor: '#767676',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1px',
    },

    icon: {
      '& > svg': {
        fill: '#767676',
        marginRight: '-20px',
      },
    },

    counter: {
      color: '#767676',
    },
  }),
  { name: 'PostInfo' },
);
