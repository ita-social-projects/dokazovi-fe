import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  experts: {
    display: 'grid',
    width: '70rem',
    height: '18rem',
    gridTemplateColumns: '4fr 2fr 4fr 1fr 2fr 4fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
    margin: '0 auto',
  },
  container: {
    minHeight: '400px',
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    top: 'calc(50% - 30px)',
    msTransform: 'translateY(-50%)',
    transform: 'translateY(-50%),',
  },
  item_0: {
    gridArea: '1 / 1 / 5 / 2',
  },
  item_1: {
    gridArea: '1 / 2 / 3 / 3',
  },
  item_2: {
    gridArea: '3 / 2 / 5 / 3',
  },
  item_3: {
    gridArea: '1 / 3 / 5 / 4',
  },
  item_4: {
    gridArea: '1 / 4 / 2 / 5',
  },
  item_5: {
    gridArea: '2 / 4 / 3 / 5',
  },
  item_6: {
    gridArea: '3 / 4 / 4 / 5',
  },
  item_7: {
    gridArea: '4 / 4 / 5 / 5',
  },
  item_8: {
    gridArea: '1 / 5 / 3 / 6',
  },
  item_9: {
    gridArea: '3 / 5 / 5 / 6',
  },
  item_10: {
    gridArea: '1 / 6 / 5 / 7',
  },
}));
