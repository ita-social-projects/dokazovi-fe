import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Avatar,
  Grid,
  TextField,
  InputLabel,
  Box,
  MenuItem,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootStateType } from 'models/rootReducer';
import { BasicButton } from 'components/Form';
import { AddAPhoto } from '@material-ui/icons';
import { useStyles } from './styles/PersonalInfo.styles';
import { IExpert } from '../../../old/lib/types';
import { getCurrentUser } from '../../../old/lib/utilities/API/api';
import { ERROR_404 } from '../../../old/lib/constants/routes';

export const PersonalInfo: React.FC = () => {
  const classes = useStyles();
  const { expertId } = useParams<{ expertId: string }>();
  const [loadedExpert, setLoadedExpert] = useState<IExpert>();
  const history = useHistory();

  // const fetchExpert = useCallback(async () => {
  //   try {
  //     const expertResponse = await getCurrentUser();
  //     setLoadedExpert(expertResponse.data);
  //   } catch (error) {
  //     history.push(ERROR_404);
  //   }
  // }, [expertId]);

  // useEffect(() => {
  //   fetchExpert();
  // }, [fetchExpert]);

  const inputChangeHandler = (
    event: { target: { value: string } },
    inputIdetifier: string,
  ) => {
    const updatedExpert: IExpert | undefined = { ...loadedExpert } as IExpert;
    updatedExpert[inputIdetifier] = event.target.value;
    setLoadedExpert(updatedExpert);
  };

  const regions = useSelector(
    (state: RootStateType) => state.properties.regions,
  );

  console.log(regions);

  return (
    <form>
      <Grid container spacing={6} className={classes.PersonalInfo}>
        <Grid xs={4} container direction="column" alignContent="center">
          <Avatar
            alt="Pic"
            className={classes.Avatar}
            src={loadedExpert?.avatar}
          />
          <Box display="flex" justifyContent="flex-end">
            <AddAPhoto style={{ color: 'blue' }} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.TextField}
            required
            variant="outlined"
            label="Прізвище"
            fullWidth
            value={loadedExpert?.lastName}
            onChange={(event) => inputChangeHandler(event, 'lastName')}
          />
          <TextField
            className={classes.TextField}
            select
            required
            variant="outlined"
            label="Регіон"
            fullWidth
          >
            {regions.map((region) => (
              <MenuItem key={region.id} value={region.name}>
                {region.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.TextField}
            required
            label="Ім'я"
            variant="outlined"
            fullWidth
            value={loadedExpert?.firstName}
            onChange={(event) => inputChangeHandler(event, 'firstName')}
          />
          <TextField
            className={classes.TextField}
            select
            required
            variant="outlined"
            label="Місто"
            fullWidth
          />
        </Grid>

        <Grid item direction="column" xs={4} className={classes.Contacts}>
          <InputLabel required className={classes.InputLabel}>
            Посилання на персональні сторінки
          </InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Електонна пошта"
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
          <InputLabel required className={classes.InputLabel}>
            Основне місце роботи
          </InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            value={loadedExpert?.mainInstitution?.name}
          />
          <InputLabel required className={classes.InputLabel}>
            Біографія
          </InputLabel>
          <TextField variant="outlined" fullWidth value={loadedExpert?.bio} />
        </Grid>
      </Grid>
      <BasicButton type="accept" />
    </form>
  );
};

export default PersonalInfo;
