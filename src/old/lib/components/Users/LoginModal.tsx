import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider/AuthContext';
import { emailValidationObj } from './validationRules';
import { IAuthInputs } from '../../types';
import { useStyles } from './LoginModal.styles';
import { login } from '../../utilities/API/api';
import { AccountIcon } from '../icons/AccountIcon';
import { langTokens } from '../../../../locales/localizationInit';
import { BasicButton, BasicInput } from '../../../../components/Form';
import { useActions } from '../../../../shared/hooks';
import { getAuthoritiesAsyncAction } from '../../../../models/authorities';

export const LoginModal: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const { setAuthorization } = useContext(AuthContext);
  const [error, setError] = useState(null);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, reset, formState, watch } = useForm<
    IAuthInputs
  >({
    mode: 'onTouched',
  });

  const [boundAuthorities] = useActions([getAuthoritiesAsyncAction]);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setError(null);
    reset();
  };

  const swalWithCustomButton = Swal.mixin({
    customClass: {
      container: classes.congratulationContainer,
      title: classes.congratulationTitleText,
      htmlContainer: classes.congratulationSubText,
      confirmButton: classes.congratulationButton,
    },
    buttonsStyling: false,
  });

  const history = useHistory();

  const onSubmit = (inputs: IAuthInputs) => {
    login(inputs.email.toLowerCase(), inputs.password)
      .then((response) => {
        setAuthorization(response.data.accessToken);
        boundAuthorities();
        handleLoginClose();
        swalWithCustomButton.fire(
          t(langTokens.loginRegistration.congratulation),
          t(langTokens.loginRegistration.youAreWelcome),
          'success',
        ).then(()=>history.push('/'));
      }).catch((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setError(err.response.data.status);
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
        className={classes.dialogContainer}
      >
        <DialogTitle
          id="form-dialog-title"
          className={classes.dialogTitleContainer}
        >
          <div className={classes.dialogTitleBlock}>
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
                <BasicInput
                  name="email"
                  label="E-mail"
                  error={!!errors.email}
                  inputRef={register(emailValidationObj)}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <BasicInput
                  name="password"
                  type="password"
                  label={t(langTokens.loginRegistration.password)}
                  inputRef={register()}
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
              <Link to="/reset-password" onClick={handleLoginClose}>
                <Typography
                  variant="subtitle1"
                  component="p"
                  className={classes.forgotPasswordText}
                >
                  {t(langTokens.loginRegistration.forgotPassword)}
                </Typography>
              </Link>
              <Grid item xs={12}>
                <div className={classes.bottomContainer}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={register}
                        name="remember"
                        icon={<span className={classes.uncheckedIcon} />}
                        checkedIcon={<span className={classes.checkedIcon} />}
                      />
                    }
                    label={t(langTokens.loginRegistration.rememberMe)}
                  />
                  <BasicButton
                    type="sign"
                    disabled={
                      !formState.isValid ||
                      watch('email')?.length === 0 ||
                      watch('password')?.length === 0
                    }
                    label={t(langTokens.loginRegistration.logIn)}
                  />
                </div>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
    // Functionality for authorization  with Facebook & Google implementation in file LoginModalOld.tsx
  );
};
