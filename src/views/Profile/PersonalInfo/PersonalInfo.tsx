import React, { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Grid,
  TextField,
  InputLabel,
  Box,
  IconButton,
  Typography,
} from '@material-ui/core';
import { BasicButton } from 'components/Form';
import { PhotoCamera } from '@material-ui/icons';
import { uploadImageToImgur } from 'old/lib/utilities/Imgur/uploadImageToImgur';
import { getStringFromFile } from 'old/lib/utilities/Imgur/getStringFromFile';
import { useStyles } from './styles/PersonalInfo.styles';
import { ErrorField } from './ErrorField';
import { regex } from './constants/regex';
import { fields } from './constants/fields';
import {
  IEditAuthorProps,
  IErrorFields,
  INewAuthorValues,
  IVisitFields,
} from './types';
import i18n, { langTokens } from '../../../locales/localizationInit';
import RegionCityHandler from './RegionCityHandler';
import { validation } from './constants/validation';
import { validateInput } from './utilities/validateInput';

export const PersonalInfo: React.FC<IEditAuthorProps> = ({ author }) => {
  const classes = useStyles();

  const [visitFields, setVisitFields] = useState<IVisitFields>({
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

  const [newAuthorValues, setNewAuthorValues] = useState<INewAuthorValues>({
    avatar: author?.avatar ?? '',
    firstName: author?.firstName ?? '',
    lastName: author?.lastName ?? '',
    regionId: author?.region.id ?? null,
    cityId: author?.mainInstitution.city.id ?? null,
    bio: author?.bio ?? '',
    email: author?.email ?? '',
    socialNetwork: author?.socialNetworks ?? [null, null, null, null, null],
    work: author?.mainInstitution.name ?? '',
  });

  const errorMessages = useMemo(() => {
    const errors: IErrorFields = {
      avatar: '',
      lastName: '',
      firstName: '',
      regionId: '',
      cityId: '',
      email: '',
      work: '',
      bio: '',
      socialNetworks: ['', '', '', '', ''],
      socialNetwoksRequired: '',
    };
    errors.avatar = newAuthorValues.avatar
      ? ''
      : i18n.t(langTokens.admin.pictureRequired);
    errors.regionId = newAuthorValues.regionId
      ? ''
      : i18n.t(langTokens.admin.fieldCantBeEmpty);
    errors.cityId = newAuthorValues.cityId
      ? ''
      : i18n.t(langTokens.admin.fieldCantBeEmpty);
    errors.lastName = validateInput(
      newAuthorValues.lastName,
      validation.name.min,
      validation.name.max,
      validation.name.regexp,
    );
    errors.firstName = validateInput(
      newAuthorValues.firstName,
      validation.name.min,
      validation.name.max,
      validation.name.regexp,
    );
    errors.bio = validateInput(
      newAuthorValues.bio,
      validation.bio.min,
      validation.bio.max,
      validation.bio.regexp,
    );
    errors.work = validateInput(
      newAuthorValues.work,
      validation.bio.min,
      validation.bio.max,
      validation.bio.regexp,
    );
    if (!newAuthorValues.email && visitFields.email) {
      errors.email = i18n.t(langTokens.admin.fieldCantBeEmpty);
    } else if (
      newAuthorValues.email &&
      !regex.validEmail.test(newAuthorValues.email)
    ) {
      errors.email = i18n.t(langTokens.admin.wrongEmail);
    } else {
      errors.email = '';
    }
    newAuthorValues.socialNetwork.forEach((sn, index) => {
      if (sn) {
        errors.socialNetworks[index] = validateInput(
          sn,
          validation.sn.min,
          validation.sn.max,
          validation.sn.regexp,
        );
      }
    });
    if (newAuthorValues.socialNetwork.some((socialNetwork) => socialNetwork)) {
      errors.socialNetwoksRequired = '';
    } else {
      errors.socialNetwoksRequired = i18n.t(
        langTokens.admin.minimumOneLinkRequired,
      );
    }
    return errors;
  }, [newAuthorValues, author]);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputIdentifier = event.target.name;
    const { value } = event.target;
    setNewAuthorValues({
      ...newAuthorValues,
      [inputIdentifier]: value,
    });
  };

  const inputSocialNetworkChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { value } = event.target;
    const newSocialNetworks = [...newAuthorValues.socialNetwork];
    newSocialNetworks.splice(index, 1, value);
    setNewAuthorValues({
      ...newAuthorValues,
      socialNetwork: newSocialNetworks,
    });
  };

  const inputAvatarChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputIdentifier = event.target.name;
    if (event.target.files !== null && event.target?.files?.length > 0) {
      const strFromFile = await getStringFromFile([...event.target.files]);
      uploadImageToImgur(strFromFile).then((res) => {
        if (res.data.status === 200) {
          setNewAuthorValues({
            ...newAuthorValues,
            [inputIdentifier]: res.data.data.link,
          });
        }
      });
    }
  };

  const blurHandler = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputIdentifier = event.target.name;
    setVisitFields({ ...visitFields, [inputIdentifier]: true });
  };

  const buttonClickHandler = () => {
    // TODO dispatch new author to server
  };

  const isSaveDisabled = useMemo(
    () =>
      Object.keys(errorMessages).some((key) => {
        if (key === 'socialNetworks') {
          return errorMessages[key].some((socialNetwork) => socialNetwork);
        }
        if (errorMessages[key]) {
          return true;
        }
        return false;
      }),
    [errorMessages],
  );

  return (
    <form>
      <Grid container spacing={6} className={classes.PersonalInfo}>
        <Grid item xs={4} container direction="column" alignContent="center">
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
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ErrorField
                errorField={errorMessages.lastName}
                visitField={visitFields.lastName}
              />
              <TextField
                className={classes.TextField}
                required
                variant="outlined"
                label={i18n.t(langTokens.admin.lastName)}
                name="lastName"
                fullWidth
                value={newAuthorValues.lastName}
                onChange={inputChangeHandler}
                onBlur={blurHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <ErrorField
                errorField={errorMessages.firstName}
                visitField={visitFields.firstName}
              />
              <TextField
                className={classes.TextField}
                required
                label={i18n.t(langTokens.admin.firstName)}
                name="firstName"
                variant="outlined"
                fullWidth
                value={newAuthorValues.firstName}
                onChange={inputChangeHandler}
                onBlur={blurHandler}
              />
            </Grid>
          </Grid>
          <RegionCityHandler
            newAuthorValues={newAuthorValues}
            visitFields={visitFields}
            errorMessages={errorMessages}
            setNewAuthorValues={setNewAuthorValues}
            blurHandler={blurHandler}
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={4}
          className={classes.Contacts}
        >
          <InputLabel required className={classes.InputLabel}>
            {i18n.t(langTokens.admin.socialNetworkLinks)}
          </InputLabel>
          {visitFields.email && errorMessages.email && (
            <Typography className={classes.Typography}>
              {errorMessages.email}
            </Typography>
          )}
          <TextField
            className={classes.TextField}
            variant="outlined"
            required
            fullWidth
            label={i18n.t(langTokens.admin.email)}
            name="email"
            value={newAuthorValues.email}
            onChange={(event) => inputChangeHandler(event)}
            onBlur={blurHandler}
          />
          <InputLabel required className={classes.InputLabel}>
            {i18n.t(langTokens.admin.minimumOneLinkRequired)}
          </InputLabel>
          {fields.socialNetworks.map((sn, index) => {
            return (
              <Box key={sn.index}>
                {errorMessages[sn.name] && (
                  <Typography className={classes.Typography}>
                    {errorMessages[sn.name]}
                  </Typography>
                )}
                <TextField
                  variant="outlined"
                  fullWidth
                  name={sn.name}
                  placeholder={sn.placeholder}
                  value={newAuthorValues.socialNetwork[sn.index]}
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
              {i18n.t(langTokens.admin.mainPlaceOfWork)}
            </InputLabel>
            {visitFields.work && errorMessages.work && (
              <Typography className={classes.Typography}>
                {errorMessages.work}
              </Typography>
            )}
          </Box>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="work"
            value={newAuthorValues.work}
            onChange={inputChangeHandler}
            onBlur={blurHandler}
          />
          <Box className={classes.WrapperBox}>
            <InputLabel required className={classes.InputLabel}>
              {i18n.t(langTokens.admin.biography)}
            </InputLabel>
            {visitFields.bio && errorMessages.bio && (
              <Typography className={classes.Typography}>
                {errorMessages.bio}
              </Typography>
            )}
          </Box>
          <TextField
            multiline
            minRows={12}
            variant="outlined"
            required
            fullWidth
            name="bio"
            value={newAuthorValues.bio}
            onChange={inputChangeHandler}
            onBlur={blurHandler}
          />
        </Grid>
      </Grid>
      <Box className={classes.ButtonBox}>
        <BasicButton
          disabled={isSaveDisabled}
          type="sign"
          label={i18n.t(langTokens.common.acceptChanges)}
          className={classes.BasicButton}
          onClick={buttonClickHandler}
        />
      </Box>
    </form>
  );
};

export default PersonalInfo;
