import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../../../apiURL';
import {
  loginUserGoogle,
  loginUserFacebook,
} from '../../../../store/authSlice';

export const SocialLogin: React.FC = () => {
  const dispatch = useDispatch();

  const handleLoginGoogle = () => {
    dispatch(loginUserGoogle());
  };

  const handleLoginFacebook = () => {
    dispatch(loginUserFacebook());
  };

  return (
    <>
      <Grid item xs={6} style={{ textAlign: 'center' }}>
        <Button href={FACEBOOK_AUTH_URL} onClick={handleLoginGoogle}>
          Facebook
        </Button>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'center' }}>
        <Button href={GOOGLE_AUTH_URL} onClick={handleLoginFacebook}>
          Google
        </Button>
      </Grid>
    </>
  );
};
