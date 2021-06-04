/* eslint-disable */
import React, { useState, useContext } from 'react';
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
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../provider/AuthProvider/AuthContext';
import { emailValidationObj, passwordValidationObj } from './validationRules';
import { IAuthInputs } from '../../types';
import { RegistrationModal } from './RegistrationModal';
import { FB_AUTH_URL, GOOGLE_AUTH_URL } from '../../../apiURL';
import { useStyles } from './LoginModal.styles';
import { login } from '../../utilities/API/api';
import { selectCurrentUser } from '../../../../models/user/selectors';
import { AccountIcon } from '../icons/AccountIcon';

export const LoginModal: React.FC = () => {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registrationOpen, setRegistrationOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { setAuthorization } = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors } = useForm<IAuthInputs>();

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
  const onSubmit = (inputs: IAuthInputs) => {
    login(inputs.email, inputs.password)
      .then((response) => {
        setAuthorization(response.data.accessToken);
        handleLoginClose();
      })
      .catch((error) => console.log(error.response.data));
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
        <DialogTitle id="form-dialog-title">
          Введіть Ваші email та пароль
          {user.error && (
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
                    <Button href={FB_AUTH_URL}>Facebook</Button>
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
