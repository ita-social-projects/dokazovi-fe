import { Button } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './styles/BasicButton.style';

type BasicButtonType = 'accept' | 'sign';

interface IBasicButtonProps {
  type: BasicButtonType;
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
  const getRootClass = () => {
    switch (type) {
      case 'accept':
        return classes.basicAcceptButton;
      case 'sign':
        return classes.basicSignButton;
      default:
        return '';
    }
  };

  return (
    <Button
      className={clsx(getRootClass(), className)}
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
