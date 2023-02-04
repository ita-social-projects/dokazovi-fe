import React, { useEffect, useState } from 'react';
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
import { PhotoCamera } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { useStyles } from './styles/PersonalInfo.styles';
import { ICity, IRegion } from '../../../old/lib/types';
import { ErrorField } from './ErrorField';
import { regex } from './constants/regex';
import { fields } from './constants/fields';
import { INewAuthorValues } from './types';

export const PersonalInfo: React.FC = () => {
  const classes = useStyles();

  const regions = useSelector(
    (state: RootStateType) => state.properties.regions,
  );
  const cities = useSelector((state: RootStateType) => state.properties.cities);
  const [newAuthorValues, setNewAuthorValues] = useState<INewAuthorValues>({
    avatar: '',
    firstName: '',
    lastName: '',
    regionId: 1,
    cityId: 1,
    bio: '',
    email: '',
    /* eslint-disable-next-line */
    socialNetwork: new Array(5).fill(null),
  });
  const [errorFields, setErrorFields] = useState({
    avatar: fields.avatarRequired,
    lastName: fields.emptyField,
    firstName: fields.emptyField,
    region: fields.emptyField,
    city: fields.emptyField,
    email: fields.emptyField,
    work: fields.emptyField,
    bio: fields.emptyField,
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
    linkedin: '',
    socialNetwoks: fields.socialNetworksEmpty,
  });
  const [visitFields, setVisitFields] = useState({
    lastName: false,
    firstName: false,
    region: false,
    city: false,
    email: false,
    work: false,
    bio: false,
    facebook: false,
    instagram: false,
    youtube: false,
    twitter: false,
    linkedin: false,
  });
  const [toggleButton, setToggleButton] = useState(true);

  const validateInput = (
    value: string,
    inputIdentifier: string,
    acceptedSymbols: string,
    minSymbols: number,
    maxSymbols: number,
    regexp: RegExp,
  ) => {
    if (value && !regexp.test(value)) {
      setErrorFields({ ...errorFields, [inputIdentifier]: acceptedSymbols });
    } else if (!value || value.length < minSymbols) {
      setErrorFields({
        ...errorFields,
        [inputIdentifier]: `Необхідно ввести мінімум ${minSymbols} символів`,
      });
    } else if (value.length > maxSymbols) {
      setErrorFields({
        ...errorFields,
        [inputIdentifier]: `Можливо ввести максимум ${maxSymbols} символів`,
      });
    } else {
      setErrorFields({ ...errorFields, [inputIdentifier]: '' });
    }
  };

  const inputNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputIdentifier = event.target.name;
    const { value } = event.target;
    setNewAuthorValues({
      ...newAuthorValues,
      [inputIdentifier]: value,
    });
    validateInput(
      value,
      inputIdentifier,
      fields.acceptedSymbols,
      2,
      30,
      regex.validUkrName,
    );
  };

  const inputBioChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputIdentifier = event.target.name;
    const { value } = event.target;
    setNewAuthorValues({
      ...newAuthorValues,
      [inputIdentifier]: value,
    });
    validateInput(
      value,
      inputIdentifier,
      fields.acceptedSymbols,
      3,
      250,
      regex.validUkrName,
    );
  };

  const inputSocialNetworkChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const inputIdentifier = event.target.name;
    const { value } = event.target;
    const newSocialNetworks = [...newAuthorValues.socialNetwork];
    newSocialNetworks.splice(index, 1, value);
    setNewAuthorValues({
      ...newAuthorValues,
      socialNetwork: newSocialNetworks,
    });
    if (!value) {
      setErrorFields({ ...errorFields, [inputIdentifier]: null });
    } else {
      validateInput(
        value,
        inputIdentifier,
        fields.acceptedSymbols,
        10,
        150,
        regex.validEnName,
      );
    }
  };

  const inputAvatarChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputIdentifier = event.target.name;
    if (event.target.files !== null && event.target?.files?.length > 0) {
      setNewAuthorValues({
        ...newAuthorValues,
        [inputIdentifier]: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const inputEmailChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputIdentifier = event.target.name;
    const { value } = event.target;
    setNewAuthorValues({
      ...newAuthorValues,
      [inputIdentifier]: value,
    });
    if (!value && visitFields.email) {
      setErrorFields({ ...errorFields, [inputIdentifier]: fields.emptyField });
    } else if (value && !regex.validEmail.test(value)) {
      setErrorFields({
        ...errorFields,
        [inputIdentifier]: fields.acceptedEmail,
      });
    } else {
      setErrorFields({ ...errorFields, [inputIdentifier]: '' });
    }
  };

  const inputRegionCityChangeHandler = (
    _,
    value: string,
    inputIdentifier: string,
  ) => {
    setNewAuthorValues({ ...newAuthorValues, [inputIdentifier]: value });
    console.log(regions.filter((region) => region.name === value)[0]?.id);
    if (!value) {
      setErrorFields({ ...errorFields, [inputIdentifier]: fields.emptyField });
    } else {
      setErrorFields({ ...errorFields, [inputIdentifier]: '' });
    }
  };

  const blurHandler = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputIdentifier = event.target.name;
    setVisitFields({ ...visitFields, [inputIdentifier]: true });
  };

  const buttonClickHandler = () => {
    // TODO
  };

  useEffect(() => {
    toggleButtonHandler();
  }, [newAuthorValues]);

  const toggleButtonHandler = () => {
    /* eslint-disable-next-line */
    for (const [value] of Object.entries(newAuthorValues)) {
      if (value === '') {
        return;
      }
    }
    setToggleButton(false);
  };

  console.log(newAuthorValues);

  return (
    <form>
      <Grid container spacing={6} className={classes.PersonalInfo}>
        <Grid xs={4} container direction="column" alignContent="center">
          <Avatar
            alt="Avatar"
            className={classes.Avatar}
            src={newAuthorValues.avatar}
          />
          <Box display="flex" justifyContent="flex-end">
            <IconButton aria-label="upload picture" component="label">
              <input
                hidden
                required
                name="avatar"
                accept="image/*"
                type="file"
                onChange={inputAvatarChangeHandler}
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
            onChange={inputNameChangeHandler}
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
              inputRegionCityChangeHandler(_, value, 'region')
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
            onChange={inputNameChangeHandler}
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
            onInputChange={(_, value) =>
              inputRegionCityChangeHandler(_, value, 'city')
            }
            renderInput={(params) => (
              <TextField
                variant="outlined"
                className={classes.TextField}
                required
                // eslint-disable-next-line
                {...params}
                label="Місто"
                name="city"
                onBlur={blurHandler}
              />
            )}
          />
        </Grid>
        <Grid item direction="column" xs={4} className={classes.Contacts}>
          <InputLabel required className={classes.InputLabel}>
            Посилання на персональні сторінки
          </InputLabel>
          {visitFields.email && errorFields.email && (
            <Typography className={classes.Typography}>
              {errorFields.email}
            </Typography>
          )}
          <TextField
            className={classes.TextField}
            variant="outlined"
            required
            fullWidth
            label="Електонна пошта"
            name="email"
            onChange={(event) => inputEmailChangeHandler(event)}
            onBlur={blurHandler}
          />
          {fields.socialNetworks.map((sn, index) => {
            return (
              <Box key={sn.index}>
                {errorFields[sn.name] && (
                  <Typography className={classes.Typography}>
                    {errorFields[sn.name]}
                  </Typography>
                )}
                <TextField
                  variant="outlined"
                  fullWidth
                  name={sn.name}
                  placeholder={sn.placeholder}
                  onChange={(event) =>
                    inputSocialNetworkChangeHandler(event, index)
                  }
                  onBlur={blurHandler}
                />
              </Box>
            );
          })}
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.WrapperBox}>
            <InputLabel required className={classes.InputLabel}>
              Основне місце роботи
            </InputLabel>
            {visitFields.work && errorFields.work && (
              <Typography className={classes.Typography}>
                {errorFields.work}
              </Typography>
            )}
          </Box>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="work"
            onChange={inputBioChangeHandler}
            onBlur={blurHandler}
          />
          <Box className={classes.WrapperBox}>
            <InputLabel required className={classes.InputLabel}>
              Біографія
            </InputLabel>
            {visitFields.bio && errorFields.bio && (
              <Typography className={classes.Typography}>
                {errorFields.bio}
              </Typography>
            )}
          </Box>
          <TextField
            multiline
            minRows={11}
            variant="outlined"
            required
            fullWidth
            name="bio"
            onChange={inputBioChangeHandler}
            onBlur={blurHandler}
          />
        </Grid>
      </Grid>
      <Box className={classes.ButtonBox}>
        <BasicButton
          disabled={toggleButton}
          type="sign"
          label="Підтвердити зміни"
          className={classes.BasicButton}
          onClick={buttonClickHandler}
        />
      </Box>
    </form>
  );
};

export default PersonalInfo;
