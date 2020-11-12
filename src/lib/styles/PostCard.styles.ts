import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  {
    root: {
      maxWidth: 400,
      minHeight: 170,
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 20px',
    },
    leftPart: {
      border: '1px solid black',
      backgroundColor: '#8a918c',
      width: 150,
      height: 170,
    },
    photo: {
      width: 80,
      height: 80,
      margin: '10px auto',
      border: '1px solid black',
    },
    fullName: {
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
    rightPart: {
      border: '1px solid black',
      width: 250,
      height: 170,
    },
    chipRoot: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 5,
      marginBottom: 50,
    },
  },
  { name: 'PostCard' },
);
