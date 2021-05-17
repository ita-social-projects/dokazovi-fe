import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    directionChip: () => ({
      backgroundColor: '#FFFFFF',
      borderRadius: '300px',
      padding: '15px 8px 15px 8px',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)',
      margin: '0px 0px 1px 0px',
    }),
  }),
  { name: 'PostDirectionChip' },
);
