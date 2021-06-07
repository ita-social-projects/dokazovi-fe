import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
    },
    topics: {
      listStyle: 'none',
      display: 'flex',
      marginRight: '20px',
      height: '32px',
      '& > *:not(:last-child)': {
        marginRight: '4px',
      },
      '& > li': {
        padding: '5px 12px',
        color: '#ffffff',
        backgroundColor: '#73DDFF',
      },
    },

    origins: {
      listStyle: 'none',
      display: 'flex',
      marginRight: '20px',
      height: '32px',

      '& > *:not(:last-child)': {
        marginRight: '4px',
      },
      '& > li': {
        padding: '5px 12px',
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
