import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useStyles } from './UpButton.styles';

const UpButton: FC = () => {
  const classes = useStyles();

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      className={`
        ${classes.button} 
        
      `}
      onClick={handleScrollUp}
    >
      <ArrowUpwardIcon className={classes.upIcon} />
    </Button>
  );
};

export default UpButton;
