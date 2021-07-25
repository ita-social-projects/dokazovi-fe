import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SentimentVeryDissatisfied } from '@material-ui/icons';

export interface INotificationProps {
  message: string | JSX.Element;
}

export const Notification: React.FC<INotificationProps> = ({ message }) => {
  return (
    <Grid
      style={{
        position: 'sticky',
        top: '45vh',
        fontSize: '24px',
        userSelect: 'none',
        width: '400px',
        height: '160px',
        margin: '0 auto',
      }}
      container
      direction="column"
      alignItems="center"
    >
      <SentimentVeryDissatisfied
        style={{
          height: '65px',
          width: '65px',
          marginBottom: '30px',
        }}
      />
      <Typography
        style={{
          fontWeight: 500,
          fontFamily: 'Raleway',
          fontSize: '24px',
          lineHeight: '32px',
        }}
        align="center"
      >
        {message}
      </Typography>
    </Grid>
  );
};
