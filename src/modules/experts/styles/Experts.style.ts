import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    width: '70rem',
    height: '18rem',
    gridTemplateColumns: '4fr 2fr 4fr 1fr 2fr 4fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
    margin: '0 auto',
  },
}));
