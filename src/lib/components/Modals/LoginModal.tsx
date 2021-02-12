import React, { useState } from 'react';
import { useForm, DeepMap, FieldError } from 'react-hook-form';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { emailValidationObj, passwordValidationObj } from './validationRules';
import { IInputs } from '../../types';
import { RegistrationModal } from './RegistrationModal';
import { clearError, loginUser } from '../../../store/authSlice';
import { RootStateType } from '../../../store/rootReducer';
import { SocialLogin } from './components/SocialLogin';

export const LoginModal: React.FC = () => {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registrationOpen, setRegistrationOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootStateType) => state.currentUser);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors } = useForm<IInputs>();

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    dispatch(clearError());
  };

  const handleRegistrationOpen = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setRegistrationOpen(true);
  };
  const onSubmit = (data: IInputs) => {
    dispatch(loginUser(data));
  };

  const handleRegistrationClose = () => {
    setRegistrationOpen(false);
    setLoginOpen(false);
  };

  const showErrorMessage = (
    errorsObj: DeepMap<IInputs, FieldError>,
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
      <Button variant="outlined" color="primary" onClick={handleLoginOpen}>
        Log in/Register
      </Button>

      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Введіть Ваші email та пароль
          {error && (
            <Alert severity="error">Неправильний email або пароль</Alert>
          )}
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: '300px', height: 'fit-content', margin: '0 auto' }}
          >
            <Grid container justify="center">
              <Grid item xs={12}>
                <TextField
                  name="email"
                  inputRef={register(emailValidationObj)}
                  label="Email"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                {showErrorMessage(errors, 'email')}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  inputRef={register(passwordValidationObj)}
                  InputProps={{
                    // <-- This is where the password toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Пароль"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                {showErrorMessage(errors, 'password')}
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '15px',
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={register}
                        name="remember"
                        color="primary"
                      />
                    }
                    label="Запам'ятати мене"
                  />

                  <Button
                    type="submit"
                    variant="outlined"
                    style={{ marginRight: '0px', alignSelf: 'flex-end' }}
                  >
                    Увійти
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ marginBottom: '10px' }}>
                  Не маєте облікового запису? {/* eslint-disable-next-line */}
                  <Link component="button" onClick={handleRegistrationOpen}>
                    Зареєструйтеся зараз!
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ marginBottom: '10px', textAlign: 'left' }}>
                  Або увійдіть за допомогою:
                </Typography>
              </Grid>
              <SocialLogin />
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
