import React, { useEffect, useState } from 'react';
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
import { IErrorFields, INewAuthorValues, IVisitFields } from './types';
import i18n, { langTokens } from '../../../locales/localizationInit';
import RegionCityHandler from './RegionCityHandler';
import { validation } from './constants/validation';
import { validateInput } from './utilities/validateInput';

export const PersonalInfo: React.FC = () => {
  const classes = useStyles();

  const [newAuthorValues, setNewAuthorValues] = useState<INewAuthorValues>({
    avatar: '',
    firstName: '',
    lastName: '',
    regionId: 0,
    cityId: 0,
    bio: '',
    email: '',
    socialNetwork: [null, null, null, null, null],
  });
  const [errorFields, setErrorFields] = useState<IErrorFields>({
    avatar: i18n.t(langTokens.admin.pictureRequired),
    lastName: i18n.t(langTokens.admin.fieldCantBeEmpty),
    firstName: i18n.t(langTokens.admin.fieldCantBeEmpty),
    regionId: i18n.t(langTokens.admin.fieldCantBeEmpty),
    cityId: i18n.t(langTokens.admin.fieldCantBeEmpty),
    email: i18n.t(langTokens.admin.fieldCantBeEmpty),
    work: i18n.t(langTokens.admin.fieldCantBeEmpty),
    bio: i18n.t(langTokens.admin.fieldCantBeEmpty),
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
    linkedin: '',
    socialNetwoks: i18n.t(langTokens.admin.minimumOneLinkRequired),
  });
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

  const inputNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputIdentifier = event.target.name;
    const { value } = event.target;
    setNewAuthorValues({
      ...newAuthorValues,
      [inputIdentifier]: value,
    });
    const validationRequest = validateInput(
      value,
      validation.name.min,
      validation.name.max,
      validation.name.regexp,
    );
    setErrorFields({ ...errorFields, [inputIdentifier]: validationRequest });
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
    const validationRequest = validateInput(
      value,
      validation.bio.min,
      validation.bio.max,
      validation.bio.regexp,
    );
    setErrorFields({ ...errorFields, [inputIdentifier]: validationRequest });
  };

  const inputSocialNetworkChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const inputIdentifier = event.target.name;
    const { value } = event.target;
    if (value) {
      const validationRequest = validateInput(
        value,
        validation.sn.min,
        validation.sn.max,
        validation.sn.regexp,
      );
      if (validationRequest) {
        setErrorFields({
          ...errorFields,
          [inputIdentifier]: validationRequest,
        });
      } else {
        const newSocialNetworks = [...newAuthorValues.socialNetwork];
        newSocialNetworks.splice(index, 1, value);
        setNewAuthorValues({
          ...newAuthorValues,
          socialNetwork: newSocialNetworks,
        });
        setErrorFields({ ...errorFields, [inputIdentifier]: '' });
      }
    } else {
      setErrorFields({ ...errorFields, [inputIdentifier]: '' });
    }
  };

  const inputAvatarChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputIdentifier = event.target.name;
    if (event.target.files !== null && event.target?.files?.length > 0) {
      const strFromFile = await getStringFromFile([...event.target.files]);
      uploadImageToImgur(strFromFile).then((res) => {
        if (res.data.status === 200) {
          setErrorFields({ ...errorFields, [inputIdentifier]: '' });
          setNewAuthorValues({
            ...newAuthorValues,
            [inputIdentifier]: res.data.data.link,
          });
        }
      });
    }
  };

  const inputEmailChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputIdentifier = event.target.name;
    const { value } = event.target;

    if (!value && visitFields.email) {
      setErrorFields({
        ...errorFields,
        [inputIdentifier]: i18n.t(langTokens.admin.fieldCantBeEmpty),
      });
    } else if (value && !regex.validEmail.test(value)) {
      setErrorFields({
        ...errorFields,
        [inputIdentifier]: i18n.t(langTokens.admin.wrongEmail),
      });
    } else {
      setErrorFields({ ...errorFields, [inputIdentifier]: '' });
      setNewAuthorValues({
        ...newAuthorValues,
        [inputIdentifier]: value,
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

  const toggleButtonHandler = () => {
    /* eslint-disable-next-line */
    for (const [, value] of Object.entries(errorFields)) {
      if (value) {
        setToggleButton(true);
        return;
      }
    }
    setToggleButton(false);
  };

  useEffect(() => {
    toggleButtonHandler();
  }, [errorFields]);

  useEffect(() => {
    if (newAuthorValues.socialNetwork.some((network) => network != null)) {
      setErrorFields({ ...errorFields, socialNetwoks: '' });
    }
  }, [newAuthorValues.socialNetwork]);

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
                errorField={errorFields.lastName}
                visitField={visitFields.lastName}
              />
              <TextField
                className={classes.TextField}
                required
                variant="outlined"
                label={i18n.t(langTokens.admin.lastName)}
                name="lastName"
                fullWidth
                onChange={inputNameChangeHandler}
                onBlur={blurHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <ErrorField
                errorField={errorFields.firstName}
                visitField={visitFields.firstName}
              />
              <TextField
                className={classes.TextField}
                required
                label={i18n.t(langTokens.admin.firstName)}
                name="firstName"
                variant="outlined"
                fullWidth
                onChange={inputNameChangeHandler}
                onBlur={blurHandler}
              />
            </Grid>
          </Grid>
          <RegionCityHandler
            newAuthorValues={newAuthorValues}
            errorFields={errorFields}
            visitFields={visitFields}
            setNewAuthorValues={setNewAuthorValues}
            setErrorFields={setErrorFields}
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
            label={i18n.t(langTokens.admin.email)}
            name="email"
            onChange={(event) => inputEmailChangeHandler(event)}
            onBlur={blurHandler}
          />
          <InputLabel required className={classes.InputLabel}>
            {i18n.t(langTokens.admin.minimumOneLinkRequired)}
          </InputLabel>
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
              {i18n.t(langTokens.admin.mainPlaceOfWork)}
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
              {i18n.t(langTokens.admin.biography)}
            </InputLabel>
            {visitFields.bio && errorFields.bio && (
              <Typography className={classes.Typography}>
                {errorFields.bio}
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
            onChange={inputBioChangeHandler}
            onBlur={blurHandler}
          />
        </Grid>
      </Grid>
      <Box className={classes.ButtonBox}>
        <BasicButton
          disabled={toggleButton}
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
