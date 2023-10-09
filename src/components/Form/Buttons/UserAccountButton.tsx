import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styles/UserAccountButton.style';

type UserAccountButtonPropsType = {
  type: 'activate' | 'deactivate' | 'create';
  label: string;
  action?: 'submit';
  disabled?: boolean;
  onClick?: () => void;
};
export const UserAccountButton: React.FC<UserAccountButtonPropsType> = ({
  label,
  onClick,
  type,
  action,
  disabled,
}) => {
  const classes = useStyles();
  const getRootClass = () => {
    switch (type) {
      case 'activate':
        return classes.activateButton;
      case 'deactivate':
        return classes.deactivateButton;
      case 'create':
        return classes.createButton;
      default:
        return '';
    }
  };
  return (
    <Button
      className={`${classes.userAccountButton} ${getRootClass()}`}
      onClick={onClick}
      disabled={disabled}
      type={action || 'button'}
      variant="contained"
    >
      {label}
    </Button>
  );
};
