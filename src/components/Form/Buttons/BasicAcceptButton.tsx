import { Button } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './styles/BasicButton.style';

interface IBasicAcceptButtonProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const BasicAcceptButton: React.FC<IBasicAcceptButtonProps> = ({
  className,
  disabled,
  label,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <Button
      className={clsx(classes.basicAcceptButton, className)}
      type="submit"
      variant="contained"
      fullWidth
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
