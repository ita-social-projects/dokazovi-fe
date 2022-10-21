import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    ExpertInfo: {
      '& .MuiFormControl-root': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      '& .MuiFormLabel-root': {
        fontFamily: 'Raleway',
        color: 'black',
        fontWeight: 600,
        fontSize: theme.spacing(3.6),
      },
    },
    Avatar: {
      height: 200,
      width: 200,
      marginright: 1000,
    },
    Contacts: {
      '& .MuiInputBase-input': {
        marginTop: theme.spacing(1),
        fontSize: theme.spacing(3.6),
        height: '1px',
      },
    },
  }),
  { name: 'ExpertInfo' },
);
