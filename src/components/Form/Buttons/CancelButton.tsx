import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styles/CancelButton.style';

type CancelButtonPropsType = {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export const CancelButton: React.FC<CancelButtonPropsType> = ({
  label,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.cancelButton}
      variant="contained"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
