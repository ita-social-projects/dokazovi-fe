import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Avatar,
  Grid,
  TextField,
  InputLabel,
  Box,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootStateType } from 'models/rootReducer';
import { BasicButton } from 'components/Form';
import { AddAPhoto, PhotoCamera } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import InsertFromFile from 'components/Editor/CustomModules/ImageFromFileHandler';
import { uploadImageToImgur } from 'old/lib/utilities/Imgur/uploadImageToImgur';
import { useStyles } from './styles/PersonalInfo.styles';
import { ICity, IExpert, IRegion } from '../../../old/lib/types';
import {
  getAllExperts,
  getCurrentUser,
} from '../../../old/lib/utilities/API/api';
import { ERROR_404 } from '../../../old/lib/constants/routes';
import { ErrorField } from './ErrorField';

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const updatedExpert: IExpert | undefined = { ...loadedExpert } as IExpert;
    const inputIdetifier = event.target.name;
    updatedExpert[inputIdetifier] = event.target.value;
    setLoadedExpert(updatedExpert);
    setNewAuthorValues({
      ...newAuthorValues,
      [inputIdetifier]: event.target.value,
    });
    if (!event.target.value) {
      setErrorFields({ ...errorFields, [inputIdetifier]: minTwoSymbol });
    } else {
      setErrorFields({ ...errorFields, [inputIdetifier]: '' });
    }
  };

  const regions = useSelector(
    (state: RootStateType) => state.properties.regions,
  );

  const cities = useSelector((state: RootStateType) => state.properties.cities);

  const [newAuthorValues, setNewAuthorValues] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    regionId: 0,
    cityId: 0,
    bio: '',
    email: '',
    socialNetwork: [],
  });

  const minTwoSymbol = 'Необхідно ввести мінімум 2 символи';
  const emptyField = 'Поле не може бути порожнім';

  const [errorFields, setErrorFields] = useState({
    avatar: 'Необхідно додати зображення',
    lastName: minTwoSymbol,
    firstName: minTwoSymbol,
    region: emptyField,
    city: emptyField,
    email: emptyField,
  });

  const [visitFields, setVisitFields] = useState({
    lastName: false,
    firstName: false,
    region: false,
    city: false,
    email: false,
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputIdetifier = event.target.name;
    if (event.target.files !== null && event.target?.files?.length > 0) {
      setNewAuthorValues({
        ...newAuthorValues,
        [inputIdetifier]: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleEmailChange = (
    event: { target: { value: string } },
    inputIdetifier: string,
  ) => {};

  interface INewAuthor {
    authorId: number;
    avatar: string;
    bio: string;
    email: string;
    firstName: string;
    lastName: string;
    mainInstitutionId: number;
    password: string;
    qualification: string;
    socialNetwork: string[];
  }

  const newAuthor: INewAuthor = {
    authorId: 0,
    avatar: newAuthorValues.avatar,
    bio: '',
    email: '',
    firstName: '',
    lastName: '',
    mainInstitutionId: 0,
    password: '',
    qualification: '',
    socialNetwork: [],
  };

  const blurHandler = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputIdentifier = event.target.name;
    // setVisitFields({ ...visitFields, [inputIdentifier]: true })
    switch (inputIdentifier) {
      case 'firstName':
        setVisitFields({ ...visitFields, [inputIdentifier]: true });
        break;
      case 'lastName':
        setVisitFields({ ...visitFields, [inputIdentifier]: true });
        break;
      case 'region':
        setVisitFields({ ...visitFields, [inputIdentifier]: true });
        break;
      case 'city':
        setVisitFields({ ...visitFields, [inputIdentifier]: true });
        break;
      default:
        break;
    }
  };

  const changeRegionHandler = (_, value: string, inputIdetifier: string) => {
    setNewAuthorValues({ ...newAuthorValues, [inputIdetifier]: value });
    console.log(value);
    if (!value) {
      console.log(`value${inputIdetifier}`);
      setErrorFields({ ...errorFields, [inputIdetifier]: emptyField });
    } else {
      setErrorFields({ ...errorFields, [inputIdetifier]: '' });
    }
  };

  const changeCityHandler = (event: {
    target: { name: string; value: string };
  }) => {
    const inputIdetifier = event.target.name;
    setNewAuthorValues({
      ...newAuthorValues,
      [inputIdetifier]: event.target.value,
    });
    if (!event.target.value) {
      console.log(`value${inputIdetifier}`);
      setErrorFields({ ...errorFields, [inputIdetifier]: emptyField });
    } else {
      setErrorFields({ ...errorFields, [inputIdetifier]: '' });
    }
  };

  console.log(newAuthorValues);

  return (
    <form>
      <Grid container spacing={6} className={classes.PersonalInfo}>
        <Grid xs={4} container direction="column" alignContent="center">
          <Avatar
            alt="Avatar"
            className={classes.Avatar}
            src={
              loadedExpert?.avatar
                ? loadedExpert.avatar
                : newAuthorValues.avatar
            }
          />
          <Box display="flex" justifyContent="flex-end">
            <IconButton aria-label="upload picture" component="label">
              <input
                hidden
                required
                name="avatar"
                accept="image/*"
                type="file"
                onChange={handleAvatarChange}
              />
              <PhotoCamera className={classes.PhotoCamera} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <ErrorField
            errorField={errorFields.lastName}
            visitField={visitFields.lastName}
          />
          <TextField
            className={classes.TextField}
            required
            variant="outlined"
            label="Прізвище"
            name="lastName"
            fullWidth
            value={loadedExpert?.lastName}
            onChange={inputChangeHandler}
            onBlur={blurHandler}
          />
          <ErrorField
            errorField={errorFields.region}
            visitField={visitFields.region}
          />
          <Autocomplete
            disablePortal
            options={regions}
            fullWidth
            getOptionLabel={(region: IRegion) => region.name}
            onInputChange={(_, value) =>
              changeRegionHandler(_, value, 'region')
            }
            renderInput={(params) => (
              <TextField
                variant="outlined"
                className={classes.TextField}
                required
                // eslint-disable-next-line
                {...params}
                label="Регіон"
                name="region"
                onBlur={blurHandler}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <ErrorField
            errorField={errorFields.firstName}
            visitField={visitFields.firstName}
          />
          <TextField
            className={classes.TextField}
            required
            label="Ім'я"
            name="firstName"
            variant="outlined"
            fullWidth
            value={loadedExpert?.firstName}
            onChange={inputChangeHandler}
            onBlur={blurHandler}
          />
          <ErrorField
            errorField={errorFields.city}
            visitField={visitFields.city}
          />
          <Autocomplete
            disablePortal
            options={cities}
            fullWidth
            getOptionLabel={(city: ICity) => city.name}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                className={classes.TextField}
                required
                // eslint-disable-next-line
                {...params}
                label="Місто"
                name="city"
                onChange={changeCityHandler}
                onBlur={blurHandler}
              />
            )}
          />
        </Grid>

        <Grid item direction="column" xs={4} className={classes.Contacts}>
          <InputLabel required className={classes.InputLabel}>
            Посилання на персональні сторінки
          </InputLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            placeholder="Електонна пошта"
            value={loadedExpert?.email}
            onChange={(event) => handleEmailChange(event, 'avatar')}
          />
          {visitFields.email && errorFields.email && (
            <Typography>{errorFields.email}</Typography>
          )}
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
            required
            fullWidth
            value={loadedExpert?.mainInstitution?.name}
          />
          <InputLabel required className={classes.InputLabel}>
            Біографія
          </InputLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            value={loadedExpert?.bio}
          />
        </Grid>
      </Grid>
      <Box className={classes.Box}>
        <BasicButton
          type="sign"
          label="Підтвердити зміни"
          className={classes.BasicButton}
        />
      </Box>
    </form>
  );
};

export default PersonalInfo;
