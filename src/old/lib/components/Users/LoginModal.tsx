import React, { useContext, useEffect, useState } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
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
import { Alert } from '@material-ui/lab';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../provider/AuthProvider/AuthContext';
import { emailValidationObj, passwordValidationObj } from './validationRules';
import { IAuthInputs } from '../../types';
import { RegistrationModal } from './RegistrationModal';
import { useStyles } from './LoginModal.styles';
import { login } from '../../utilities/API/api';
import { selectCurrentUser } from '../../../../models/user/selectors';
import { AccountIcon } from '../icons/AccountIcon';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

export const LoginModal: React.FC = () => {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registrationOpen, setRegistrationOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { setAuthorization } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
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
    setFormData({
      email: '',
      password: '',
    });
    reset();
  };

  const onSubmit = (inputs: IAuthInputs) => {
    login(inputs.email, inputs.password)
      .then((response) => {
        setAuthorization(response.data.accessToken);
        handleLoginClose();
      })
      .catch((err) => setError(err.response.data.status));
  };

  const handleRegistrationClose = () => {
    setRegistrationOpen(false);
    setLoginOpen(false);
  };

  const showErrorMessage = (
    errorsObj: DeepMap<IAuthInputs, FieldError>,
    inputName: string,
  ): JSX.Element => {
    return (
      errorsObj[inputName] && (
        // eslint-disable-next-line
        <Alert severity="error">{errorsObj[inputName].message}</Alert>
      )
    );
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
          Увійти
        </Typography>
      </Button>

      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          <div className={classes.titleContainer}>
            <Typography
              variant={'subtitle1'}
              className={classes.dialogTitleText}
            >
              Введіть E-mail і пароль
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
                  variant={'outlined'}
                  margin={'normal'}
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
                  variant={'outlined'}
                  margin={'normal'}
                  fullWidth
                  name="password"
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
                  label="Пароль"
                />
              </Grid>
              {error && (
                <Typography
                  variant={'subtitle1'}
                  component={'p'}
                  className={classes.error}
                >
                  Ви ввели неправильний логін та/або пароль!
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
                    label="Запам'ятати мене"
                  />
                  {checked && <DoneIcon className={classes.doneIcon} />}
                  <Button
                    className={classes.submitButton}
                    type="submit"
                    variant={'contained'}
                    disabled={
                      !!errors.email ||
                      !!errors.password ||
                      !formData.email ||
                      !formData.password ||
                      !!error
                    }
                  >
                    Увійти
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
          <RegistrationModal
            registrationOpen={registrationOpen}
            onRegistrationClose={handleRegistrationClose}
            showErrorMessage={showErrorMessage}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
