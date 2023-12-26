import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  (theme) => ({
    FormBox: {
      '& ': {
        padding: '20px 0',
      },
      [theme.breakpoints.down('sm')]: {
        '& p': {
          textAlign: 'center',
        },
      },
      [theme.breakpoints.down('xs')]: {
        '& ': {
          padding: '30px 0',
        },
      },
    },
    ButtonBox: {
      [theme.breakpoints.down('sm')]: {
        '& ': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
    SuccessButtonBox: {
      '& ': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    SuccessContainer: {
      '& ': {
        padding: '20px 0',
      },
      [theme.breakpoints.down('xs')]: {
        '& ': {
          padding: '30px 0',
        },
      },
    },
    successText: {
      textAlign: 'center',
    },
  }),
  { name: 'CreateUserAccountPage' },
);
