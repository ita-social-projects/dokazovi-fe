import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../store/authSlice';

const LogOutButton: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogoutHandler = () => {
    dispatch(logOut());
    history.push(`/`);
  };

  return (
    <Button variant="outlined" onClick={onLogoutHandler}>
      Вийти
    </Button>
  );
};

export default LogOutButton;
