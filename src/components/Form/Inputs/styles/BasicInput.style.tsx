import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    basicInput: {
      marginTop: theme.spacing(7),
      '& .MuiInputBase-input': {
        fontFamily: 'Raleway',
        fontWeight: 600,
        fontSize: theme.spacing(3.6),
        lineHeight: theme.spacing(4.4),
      },
      '& .MuiFormHelperText-root': {
        fontFamily: 'Raleway',
        fontSize: theme.spacing(2.6),
        paddingTop: theme.spacing(0.6),
      },
    },
    visibilityIconButton: { padding: 0 },
    visibilityIcon: {
      fontSize: theme.spacing(6.8),
      color: 'black',
    },
  }),
  {
    name: 'BasicInput',
  },
);
