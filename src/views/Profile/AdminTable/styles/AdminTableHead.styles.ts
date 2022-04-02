import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  sortable: {
    color: theme.palette.info.light,
    '&.MuiTableSortLabel-active': {
      color: theme.palette.info.light,
    },
    '&:hover': {
      color: theme.palette.action.hover,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    ...theme.typography.button,
  },
  titleCell: {
    width: '320px',
  },
}));
