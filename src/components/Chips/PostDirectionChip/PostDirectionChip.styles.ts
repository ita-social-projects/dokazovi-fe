import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    directionChip: () => ({
      height: '29px',
      margin: '0px 15px 15px 0px',
      borderRadius: '300px',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Raleway, sans-serif',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '1.17',
      userSelect: 'none',
    }),
  }),
  { name: 'PostDirectionChip' },
);
