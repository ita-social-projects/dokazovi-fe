import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    FormBox: {
      '& ': {
        display: 'flex',
        gap: '15px',
      },
      '& .MuiFormLabel-root': {
        color: 'black',
        fontWeight: 600,
        fontSize: theme.spacing(3.2),
      },
      [theme.breakpoints.down('xs')]: {
        '& ': {
          flexDirection: 'column',
        },
      },
    },
    Form: {
      '& ': {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
      },
      [theme.breakpoints.down('xs')]: {
        '& ': {
          flex: '1 1 auto',
        },
      },
    },
    Typography: {
      '& ': {
        color: theme.palette.warning.main,
        fontSize: '0.875rem',
      },
    },
    TextField: {
      '& .MuiInputLabel-root.Mui-required': {
        display: 'flex',
        flexDirection: 'row-reverse',
      },
    },
  }),
  { name: 'CreateUserAccountForm' },
);
