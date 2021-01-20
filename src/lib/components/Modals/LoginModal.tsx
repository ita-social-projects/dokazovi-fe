import React from 'react';
import { useForm } from 'react-hook-form';
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

  const onSubmit = (data) => console.log(data);

  const showErrorMessage = (inputName: string) => {
    return (
      errors[inputName] && (
        <span style={{ color: 'red' }}>Це поле обов&apos;язкове</span>
      )
    );
  };

  console.log(errors);

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
            style={{ width: '300px', height: '260px', margin: '0 auto' }}
          >
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  inputRef={register({ required: true })}
                  label="Email"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                {showErrorMessage('email')}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  inputRef={register({ required: true })}
                  label="Пароль"
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                {showErrorMessage('password')}
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={register}
                        name="remember"
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />

                  <Button
                    type="submit"
                    variant="outlined"
                    style={{ marginRight: '0px', alignSelf: 'flex-end' }}
                  >
                    Sign in
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
                <Typography style={{ marginBottom: '10px' }}>
                  Не маєте облікового запису? {/* eslint-disable-next-line */}
                  <Link component="button" onClick={handleRegistrationOpen}>
                    Зареєструйтеся зараз!
                  </Link>
                </Typography>
                <RegistrationModal
                  registrationOpen={registrationOpen}
                  onRegistrationClose={handleRegistrationClose}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ marginBottom: '10px' }}>
                  Або увійдіть за допомогою:
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ margin: '0px auto' }}>
                <Grid container>
                  <Grid item xs={6}>
                    <Button>Facebook</Button>
                  </Grid>
                  <Grid item xs={6}>
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
