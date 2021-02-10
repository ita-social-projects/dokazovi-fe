import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../../../apiURL';

export const SocialLogin: React.FC = () => {
  return (
    <>
      <Grid item xs={6} style={{ textAlign: 'center' }}>
        <Button href={FACEBOOK_AUTH_URL}>Facebook</Button>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'center' }}>
        <Button href={GOOGLE_AUTH_URL}>Google</Button>
      </Grid>
    </>
  );
};
