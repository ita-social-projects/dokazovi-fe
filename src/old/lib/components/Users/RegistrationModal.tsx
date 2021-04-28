import React, { useState } from 'react';
import { useForm, DeepMap, FieldError } from 'react-hook-form';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { emailValidationObj, passwordValidationObj } from './validationRules';
import { IAuthInputs } from '../../types';

export interface IRegistrationProps {
  registrationOpen: boolean;
  onRegistrationClose: () => void;
  showErrorMessage: (
    errorsObj: DeepMap<IAuthInputs, FieldError>,
    inputName: string,
  ) => JSX.Element;
}

export const RegistrationModal: React.FC<IRegistrationProps> = (props) => {
  const { onRegistrationClose, registrationOpen, showErrorMessage } = props;
  const [showPassword, setShowPassword] = useState(false);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, watch } = useForm<IAuthInputs>();

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <>
      <Dialog
        open={registrationOpen}
        onClose={onRegistrationClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Введіть інформацію про себе
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: '300px', height: 'fit-content', margin: '0 auto' }}
          >
            <Grid container justify="center">
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Це поле є обов'язковим",
                    },
                  })}
                  label="Ім'я"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Це поле є обов'язковим",
                    },
                  })}
                  label="Прізвище"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6}>
                {showErrorMessage(errors, 'firstName')}
              </Grid>
              <Grid item xs={6}>
                {showErrorMessage(errors, 'lastName')}
              </Grid>
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
                    // This is where the password toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                <TextField
                  name="password2"
                  type={showPassword ? 'text' : 'password'}
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Це поле є обов'язковим",
                    },
                    validate: (value) => {
                      return (
                        value === watch('password') || 'Паролі не збігаються'
                      ); // value is from password2 and watch will return value from password
                    },
                  })}
                  InputProps={{
                    // This is where the password toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Повторіть пароль"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                {showErrorMessage(errors, 'password2')}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  marginTop: '15px',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}
              >
                <Button type="submit" variant="outlined">
                  Зареєструватися
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ marginBottom: '10px', textAlign: 'left' }}>
                  Або увійдіть за допомогою:
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ margin: '0px auto' }}>
                <Grid container justify="center">
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Button>Facebook</Button>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Button>Google</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
