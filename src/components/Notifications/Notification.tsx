import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { SentimentVeryDissatisfied } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { langTokens } from 'locales/localizationInit';
import { useStyles } from './Notification.styles';

export interface INotificationProps {
  message: string | JSX.Element;
}

export const Notification: React.FC<INotificationProps> = ({ message }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid
      style={{
        fontSize: '24px',
        userSelect: 'none',
        width: '400px',
        height: '240px',
        margin: '100px auto 0',
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
      <Button
        data-testid="button"
        color="primary"
        onClick={() => history.push('/')}
        className={[classes.btnCancel, classes.btn].join(' ')}
      >
        {t(langTokens.common.goBackToMain).toUpperCase()}
      </Button>
    </Grid>
  );
};
