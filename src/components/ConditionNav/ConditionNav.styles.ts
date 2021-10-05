import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      marginBottom: '80px',
      listStyle: 'none',
      '& :not(:last-child)': {
        marginRight: '20px',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '25px 10px',
        marginBottom: '0',
        background: '#F1F1F1',
        position: 'sticky',
        top: 0,
      },
    },
    moveRoot: {
      [theme.breakpoints.down('xs')]: {
        top: 85,
      },
    },
    link: {
      color: '#2F80ED',
      fontFamily: 'Raleway',
      fontWeight: 500,
      lineHeight: '16px',
      textDecoration: 'underline',
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
    },
    linkSelected: {
      color: '#000000',
      fontWeight: 700,
      textDecoration: 'none',
    },
  }),
  { name: 'ConditionsNav' },
);
