import { makeStyles, Theme } from '@material-ui/core';

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
      '& .MuiFormLabel-asterisk.MuiInputLabel-asterisk': {
        color: theme.palette.warning.main,
      },
    },
    Avatar: {
      height: 200,
      width: 200,
      marginright: 1000,
    },
    Contacts: {
      '& .MuiInputBase-input': {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2.95),
        fontSize: theme.spacing(3.6),
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
        marginBottom: theme.spacing(1),
      },
    },
    PhotoCamera: {
      '& ': {
        color: theme.palette.custom.colorAquaBlue,
      },
    },
    BasicButton: {
      '& ': {
        marginTop: theme.spacing(5),
        width: 300,
        borderRadius: theme.spacing(0),
      },
    },
    ButtonBox: {
      '& ': {
        width: 'fullwidth',
        display: 'flex',
        justifyContent: 'right',
      },
    },
    WrapperBox: {
      '& ': {
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
    Typography: {
      '& ': {
        color: theme.palette.warning.main,
        fontSize: '0.875rem',
        height: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
      },
    },
  }),
  { name: 'PersonalInfo' },
);
