import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/authSlice';

export interface ILogOutButtonProps {}

const LogOutButton: React.FC<ILogOutButtonProps> = () => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logOut());
  };

  return (
    <Button variant="outlined" onClick={onLogoutHandler}>
      Вийти
    </Button>
  );
};

export default LogOutButton;
