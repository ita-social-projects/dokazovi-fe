import { AddAPhoto } from '@material-ui/icons';
import { makeStyles, Theme, TextField, InputLabel } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    PersonalInfo: {
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
    TextField: {
      '& .MuiInputLabel-root.Mui-required': {
        display: 'flex',
        flexDirection: 'row-reverse',
      },
    },
    InputLabel: {
      '& ': {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'left',
      },
    },
    PhotoCamera: {
      '& ': {
        color: theme.palette.custom.colorAquaBlue,
      },
    },
    BasicButton: {
      '& ': {
        width: 300,
        borderRadius: theme.spacing(0),
      },
    },
    Box: {
      '& ': {
        width: 'fullwidth',
        display: 'flex',
        justifyContent: 'right',
      },
    },
  }),
  { name: 'PersonalInfo' },
);
