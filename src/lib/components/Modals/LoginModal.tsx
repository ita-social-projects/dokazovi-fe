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
import { RegistrationModal } from './RegistrationModal';

export interface IInputs {
  email: string;
  password: string;
}

export const LoginModal: React.FC = () => {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registrationOpen, setRegistrationOpen] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors } = useForm<IInputs>();

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegistrationOpen = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setRegistrationOpen(true);
  };

  const handleRegistrationClose = () => {
    setRegistrationOpen(false);
    setLoginOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  const showErrorMessage = (
    errorsObj: DeepMap<IInputs, FieldError>,
    inputName: string,
  ): JSX.Element => {
    return (
      errorsObj[inputName] && (
        // eslint-disable-next-line
        <span style={{ color: 'red' }}>{errorsObj[inputName].message}</span>
      )
    );
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleLoginOpen}>
        Login
      </Button>

      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Введіть Ваш email та пароль
          {/* {response.error && (
                  <span style={{ color: 'red' }}>Неправильний email або пароль</span>
                )} */}
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: '300px', height: '280px', margin: '0 auto' }}
          >
            <Grid container justify="center">
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
