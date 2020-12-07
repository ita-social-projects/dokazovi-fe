import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    root: {
      maxWidth: 400,
      minHeight: 170,
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 20px 0 0',
    },
    leftPart: {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      backgroundColor: '#f5f5f5',
      width: 150,
      height: 170,
    },
    photo: {
      width: 80,
      height: 80,
      margin: '10px auto',
      border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    rightPart: {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderLeft: 'none',
      width: 250,
      height: 170,
    },
    chipRoot: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 5,
      marginBottom: 50,
    },
    createdAt: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 5,
      marginTop: 20,
    },
  },
  { name: 'CourseCard' },
);
