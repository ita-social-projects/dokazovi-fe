import { Button } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './styles/BasicButton.style';

interface IBasicSignButtonProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const BasicSignButton: React.FC<IBasicSignButtonProps> = ({
  className,
  disabled,
  label,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <Button
      className={clsx(classes.basicSignButton, className)}
      type="submit"
      variant="contained"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
