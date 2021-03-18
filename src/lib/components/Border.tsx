import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      customBorder: {
        width: '100%',
        height: '1px',
        background: 'rgba(0, 0, 0, 0.2)',
        margin: theme.spacing(10, 0),
      },
    }),
  { name: 'BorderBottom' },
);

const BorderBottom: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.customBorder} />;
};

export default BorderBottom;
