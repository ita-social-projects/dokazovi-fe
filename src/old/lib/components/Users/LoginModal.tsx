import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { AuthContext } from '../../../provider/AuthProvider/AuthContext';
import { emailValidationObj, passwordValidationObj } from './validationRules';
import { IAuthInputs } from '../../types';
import { useStyles } from './LoginModal.styles';
import { login } from '../../utilities/API/api';
import { AccountIcon } from '../icons/AccountIcon';
import { langTokens } from '../../../../locales/localizationInit';

export const LoginModal: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthorization } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [formData.email, formData.password]);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, reset } = useForm<IAuthInputs>({
    mode: 'onTouched',
  });

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setChecked(false);
    setError(null);
    setDisabled(false);
    setFormData({
      email: '',
      password: '',
    });
    reset();
  };

  const onSubmit = (inputs: IAuthInputs) => {
    setDisabled(true);
    login(inputs.email, inputs.password)
      .then((response) => {
        setAuthorization(response.data.accessToken);
        handleLoginClose();
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .catch((err) => {
        setError(err.response.data.status);
        setDisabled(false);
      });
  };

  return (
    <>
      <Button
        className={classes.button}
        color="primary"
        onClick={handleLoginOpen}
      >
        <AccountIcon className={classes.icon} />
        <Typography className={classes.label} variant="h5">
          {t(langTokens.loginRegistration.logIn)}
        </Typography>
      </Button>

      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          <div className={classes.titleContainer}>
            <Typography variant="subtitle1" className={classes.dialogTitleText}>
              {t(langTokens.loginRegistration.enterEmailAndPassword)}
            </Typography>
            <IconButton
              className={classes.closeIconButton}
              onClick={handleLoginClose}
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <TextField
                  className={classes.emailInput}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  inputRef={register(emailValidationObj)}
                  label="E-mail"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value.trim(),
                    }))
                  }
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label={t(langTokens.loginRegistration.password)}
                  type={showPassword ? 'text' : 'password'}
                  inputRef={register(passwordValidationObj)}
                  error={!!errors.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value.trim(),
                    }))
                  }
                  helperText={errors?.password?.message}
                  InputProps={{
                    // This is where the password toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          className={classes.visibilityIconButton}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOff className={classes.visibilityIcon} />
                          ) : (
                            <Visibility className={classes.visibilityIcon} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {error && (
                <Typography
                  variant="subtitle1"
                  component="p"
                  className={classes.error}
                >
                  {t(langTokens.loginRegistration.wrongEmailOrPassword)}
                </Typography>
              )}
              <Grid item xs={12}>
                <div className={classes.bottomContainer}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={register}
                        name="remember"
                        style={checked ? { color: '#73DDFF' } : undefined}
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                    }
                    label={t(langTokens.loginRegistration.rememberMe)}
                  />
                  {checked && <DoneIcon className={classes.doneIcon} />}
                  <Button
                    className={classes.submitButton}
                    type="submit"
                    variant="contained"
                    disabled={
                      !!errors.email ||
                      !!errors.password ||
                      !formData.email ||
                      !formData.password ||
                      !!error ||
                      disabled
                    }
                  >
                    {t(langTokens.loginRegistration.logIn)}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
