import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    section: {
      minHeight: '200px',
      margin: '15px auto 0',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      '& .postPreview:nth-child(even)': {
        marginLeft: theme.spacing(2),
      },
      '& .postPreview:nth-child(odd)': {
        marginRight: theme.spacing(2),
      },
    },
  }),
  { name: 'MaterialsView' },
);
