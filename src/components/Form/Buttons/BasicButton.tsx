import { Button } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './styles/BasicButton.style';

interface IBasicButtonProps {
  type: 'accept' | 'sign';
  className?: string;
  disabled?: boolean;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const BasicButton: React.FC<IBasicButtonProps> = ({
  type,
  className,
  disabled,
  label,
  onClick,
}) => {
  const classes = useStyles();
  let rootClass: string;
  switch (type) {
    case 'accept':
      rootClass = classes.basicAcceptButton;
      break;
    case 'sign':
      rootClass = classes.basicSignButton;
      break;
  }

  return (
    <Button
      className={clsx(rootClass, className)}
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
