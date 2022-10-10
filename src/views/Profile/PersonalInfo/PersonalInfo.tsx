import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar, Grid, TextField, InputLabel } from '@material-ui/core';
import { useStyles } from './styles/PersonalInfo.styles';
import { IExpert } from '../../../old/lib/types';
import { getCurrentUser } from '../../../old/lib/utilities/API/api';
import { ERROR_404 } from '../../../old/lib/constants/routes';

export const PersonalInfo: React.FC = () => {
  const classes = useStyles();
  const { expertId } = useParams<{ expertId: string }>();
  const [loadedExpert, setLoadedExpert] = useState<IExpert>();
  const [statusCode, setStatusCode] = useState<number>();
  const history = useHistory();

  const fetchExpert = useCallback(async () => {
    try {
      const expertResponse = await getCurrentUser();
      setLoadedExpert(expertResponse.data);
    } catch (error) {
      setStatusCode(404);
    }
  }, [expertId]);

  useEffect(() => {
    fetchExpert();
  }, [fetchExpert]);

  if (statusCode === 404) {
    history.push(ERROR_404);
  }

  const inputChangeHandler = (
    event: { target: { value: string } },
    inputIdetifier: string,
  ) => {
    const updatedExpert: IExpert | undefined = { ...loadedExpert } as IExpert;
    updatedExpert[inputIdetifier] = event.target.value;
    setLoadedExpert(updatedExpert);
  };

  return (
    <form>
      <Grid container spacing={6} className={classes.PersonalInfo}>
        <Grid xs={4}>
          <Avatar
            alt="Pic"
            className={classes.Avatar}
            src={loadedExpert?.avatar}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            label="Прізвище"
            fullWidth
            value={loadedExpert?.lastName}
            onChange={(event) => inputChangeHandler(event, 'lastName')}
          />
          <TextField select variant="outlined" label="Регіон" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Ім'я"
            variant="outlined"
            fullWidth
            value={loadedExpert?.firstName}
            onChange={(event) => inputChangeHandler(event, 'firstName')}
          />
          <TextField select variant="outlined" label="Місто" fullWidth />
        </Grid>

        <Grid item direction="column" xs={4} className={classes.Contacts}>
          <InputLabel>Посилання на персогальні сторінки</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Єлектонна пошта"
            value={loadedExpert?.email}
          />
          <TextField
            variant="outlined"
            fullWidth
            placeholder="https://www.facebook.com"
            value={loadedExpert?.socialNetworks?.[0]}
          />
          <TextField
            variant="outlined"
            fullWidth
            placeholder="https://www.instagram.com"
          />
          <TextField
            variant="outlined"
            fullWidth
            placeholder="https://www.youtube.com"
          />
          <TextField
            variant="outlined"
            fullWidth
            placeholder="https://www.twitter.com"
          />
          <TextField
            variant="outlined"
            fullWidth
            placeholder="https://www.linkedin.com"
          />
        </Grid>
        <Grid item xs={8}>
          <InputLabel>Основне місце роботи</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            value={loadedExpert?.mainInstitution?.name}
          />
          <InputLabel>Біографія</InputLabel>
          <TextField variant="outlined" fullWidth value={loadedExpert?.bio} />
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalInfo;
