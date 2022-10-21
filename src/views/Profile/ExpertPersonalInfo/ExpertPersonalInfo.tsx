import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Avatar, Grid, TextField, InputLabel, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useStyles } from './styles/ExpertPersonalInfo.styles';
import { ERROR_404 } from '../../../old/lib/constants/routes';
import { selectAuthorities } from '../../../models/authorities';
import { getExpertById } from '../../../old/lib/utilities/API/api';
import { IExpert } from '../../../old/lib/types';
import { RegionDropDown } from './RegionDropDown';
import { CityDropDown } from './CityDropDown';

export const ExpertPersonalInfo: React.FC = () => {
  const classes = useStyles();
  const { expertId } = useParams<{ expertId: string }>();
  const [expert, setExpert] = useState<IExpert>();
  const history = useHistory();
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');

  if (!isAdmin) {
    history.push(ERROR_404);
  }

  const fetchExpertById = async () => {
    try {
      const expertResponse = await getExpertById(Number(expertId));
      setExpert(expertResponse.data);
    } catch (error) {
      history.push(ERROR_404);
    }
  };

  useEffect(() => {
    fetchExpertById();
  }, [expertId]);

  const inputChangeHandler = (value: string, inputIdetifier: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const updatedExpert: IExpert | undefined = {
      ...expert,
    } as IExpert;
    switch (inputIdetifier) {
      case 'mainInstitutionName':
        updatedExpert.mainInstitution.name = value;
        break;
      default:
        updatedExpert[inputIdetifier] = value;
    }
    setExpert(updatedExpert);
  };

  return (
    <form>
      <Grid container spacing={6} className={classes.ExpertInfo}>
        <Grid item xs={4}>
          <Avatar alt="Pic" className={classes.Avatar} src={expert?.avatar} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            variant="outlined"
            label="Прізвище"
            fullWidth
            InputLabelProps={{ shrink: !!expert?.lastName }}
            value={expert?.lastName}
            onChange={(event) =>
              inputChangeHandler(event.target.value, 'lastName')
            }
          />
          <RegionDropDown
            expertRegion={expert?.region}
            setExpertInfo={setExpert}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Ім'я"
            variant="outlined"
            required
            fullWidth
            InputLabelProps={{ shrink: !!expert?.firstName }}
            value={expert?.firstName}
            onChange={(event) =>
              inputChangeHandler(event.target.value, 'firstName')
            }
          />
          <CityDropDown
            expertCity={expert?.mainInstitution.city}
            regionId={expert?.region.id}
            setExpertInfo={setExpert}
          />
        </Grid>
        <Grid item direction="column" xs={4} className={classes.Contacts}>
          <InputLabel required>Посилання на персогальні сторінки</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Єлектонна пошта"
            value={expert?.email}
            onChange={(event) =>
              inputChangeHandler(event.target.value, 'email')
            }
          />
          <TextField
            variant="outlined"
            fullWidth
            placeholder="https://www.facebook.com"
            value={expert?.socialNetworks[0]}
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
          <InputLabel required>Основне місце роботи</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            value={expert?.mainInstitution.name}
            onChange={(event) =>
              inputChangeHandler(event.target.value, 'mainInstitutionName')
            }
          />
          <InputLabel required>Біографія</InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            value={expert?.bio}
            onChange={(event) => inputChangeHandler(event.target.value, 'bio')}
          />
        </Grid>
        <Grid item xs={12} container direction="row-reverse" spacing={2}>
          <Grid item>
            <Button type="submit" variant="outlined">
              Підтвердити зміни
            </Button>
          </Grid>
          <Grid item>
            <Button type="reset" variant="outlined" onClick={fetchExpertById}>
              Відмінити всі зміни
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpertPersonalInfo;
