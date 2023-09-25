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
      '& .MuiSvgIcon-root': {
        fontSize: '1.8rem',
      },
    },
    Avatar: {
      height: 200,
      width: 200,
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
        borderRadius: '1rem',
        padding: '1px',
        border: '2px solid',
        borderColor: theme.palette.custom.colorAquaBlue,
        color: theme.palette.custom.colorAquaBlue,
      },
      '&:hover': {
        opacity: 0.7,
      },
    },
    BasicButton: {
      '& ': {
        borderRadius: theme.spacing(0),
      },
    },
    ButtonBox: {
      '& ': {
        display: 'flex',
        gap: '15px',
        marginTop: theme.spacing(5),
        justifyContent: 'right',
      },
      [theme.breakpoints.down('xs')]: {
        '& ': {
          justifyContent: 'center',
        },
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
