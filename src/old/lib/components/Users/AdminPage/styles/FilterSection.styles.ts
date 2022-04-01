import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    filterSection: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: theme.spacing(2, 0, 0),
      '& .filterView': {
        width: '30%',
      },
      '& .dropdownFilter': {
        width: '100%',
        borderRadius: '10px',
        backgroundColor: '#fff',
        marginBottom: theme.spacing(1),
      },
    },
  }),
  { name: 'FilterSection' },
);
