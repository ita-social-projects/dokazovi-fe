/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useForm, DeepMap, FieldError } from 'react-hook-form';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RegistrationModal } from './RegistrationModal';
import { clearError, loginUser } from '../../../store/authSlice';
import { RootStateType } from '../../../store/rootReducer';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../../apiURL';

export interface IInputs {
  email: string;
  password: string;
}

export const LoginModal: React.FC = () => {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registrationOpen, setRegistrationOpen] = React.useState(false);
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
        <span style={{ color: 'red' }}>{errorsObj[inputName].message}</span>
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
            <div style={{ color: 'red' }}>Неправильний email або пароль</div>
          )}
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
                      message: 'Неправильний формат email',
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
                    <Button href={FACEBOOK_AUTH_URL}>Facebook</Button>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Button href={GOOGLE_AUTH_URL}>Google</Button>
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
