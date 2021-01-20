import React from 'react';
import { useForm, DeepMap, FieldError } from 'react-hook-form';
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

export interface IInputs {
  email: string;
  password: string;
}

export interface IRegistrationProps {
  registrationOpen: boolean;
  onRegistrationClose: () => void;
  showErrorMessage: (
    errorsObj: DeepMap<IInputs, FieldError>,
    inputName: string,
  ) => JSX.Element;
}

export const RegistrationModal: React.FC<IRegistrationProps> = (props) => {
  const { onRegistrationClose, registrationOpen, showErrorMessage } = props;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, watch } = useForm<IInputs>();

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
            style={{ width: '300px', height: '320px', margin: '0 auto' }}
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
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Це поле є обов'язковим",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message:
                        'Email повинен містити символ @ та одну крапку після нього',
                    },
                  })}
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
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Це поле є обов'язковим",
                    },
                    minLength: {
                      value: 4,
                      message: 'Пароль повинен містити щонайменше 4 символи',
                    },
                    maxLength: {
                      value: 16,
                      message: 'Пароль повинен містити щонайбільше 16 символи',
                    },
                  })}
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
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Це поле є обов'язковим",
                    },
                    validate: (value) => {
                      return (
                        value === watch('password') || 'Паролі не збігаються'
                      ); // value is from password2 and watch will return value from password1
                    },
                  })}
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
