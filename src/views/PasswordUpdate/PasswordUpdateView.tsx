import { Container, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';
import { signOutAction } from '../../models/user';
import { BasicAcceptButton, BasicInput } from '../../components/Form';
import { langTokens } from '../../locales/localizationInit';
import { passwordValidationObj } from '../../old/lib/components/Users/validationRules';
import { useQuery } from '../../old/lib/hooks/useQuery';
import {
  checkPasswordToken,
  newPasswordRequest,
} from '../../old/lib/utilities/API/api';
import { useStyles } from './PasswordUpdateView.style';
import { useActions } from '../../shared/hooks';

interface INewPasswordInputs {
  newPassword: string;
  matchPassword: string;
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const PasswordUpdateView = () => {
  const query = useQuery();
  const history = useHistory();
  const classes = useStyles();
  const [token] = useState<string | null>(query.get('token'));
  const [doesTokenValid, setDoesTokenValid] = useState<boolean | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const { removeAuthorization } = useContext(AuthContext);
  const [boundSignOutAction] = useActions([signOutAction]);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, watch, formState } = useForm<
    INewPasswordInputs
  >({
    mode: 'onTouched',
  });

  useEffect(() => {
    if (!token) return;
    const getTokenValid = async () => {
      setDoesTokenValid(await checkPasswordToken(token));
    };
    getTokenValid();
  }, []);

  const onSubmit = async (inputs: INewPasswordInputs) => {
    if (!token) return;
    const doesSuccess = await newPasswordRequest(
      token,
      inputs.newPassword,
      inputs.matchPassword,
    );
    if (doesSuccess) {
      setSuccess(true);
      boundSignOutAction();
      removeAuthorization();
    }
    setError(true);
  };
  const newPasswordUpdated = (
    <Container>
      <Typography variant="h3" component="p" className={classes.successText}>
        {`${t(langTokens.passwordForms.newPasswordSuccess)}!`}
      </Typography>
      <BasicAcceptButton
        label={t(langTokens.passwordForms.goToHome)}
        onClick={() => history.push('/')}
      />
    </Container>
  );

  const newPasswordForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" component="p">
        {`${t(langTokens.passwordForms.newPasswordFormTitle)}:`}
      </Typography>

      <BasicInput
        name="newPassword"
        type="password"
        label={t(langTokens.passwordForms.newPassword)}
        inputRef={register(passwordValidationObj)}
        error={!!errors.newPassword}
        helperText={errors?.newPassword?.message}
      />

      <BasicInput
        name="matchPassword"
        type="password"
        label={t(langTokens.passwordForms.newPasswordMatch)}
        inputRef={register({
          ...passwordValidationObj,
          validate: () => watch('newPassword') === watch('matchPassword'),
        })}
        error={!!errors.matchPassword}
        helperText={
          errors?.matchPassword?.message ||
          (errors.matchPassword?.type === 'validate' &&
            t(langTokens.passwordForms.passwordsNotMatch))
        }
      />

      {error && (
        <Typography variant="subtitle1" component="p" className={classes.error}>
          {t(langTokens.passwordForms.newPasswordFormServerError)}
        </Typography>
      )}

      <BasicAcceptButton
        label={t(langTokens.common.acceptChanges)}
        disabled={
          !formState.isValid ||
          watch('newPassword')?.length === 0 ||
          watch('matchPassword')?.length === 0
        }
      />
    </form>
  );
  if (doesTokenValid) {
    if (success) {
      return newPasswordUpdated;
    }
    return newPasswordForm;
  }
  if (doesTokenValid === false) {
    return <Redirect to="/" />;
  }
  return <></>;
};

export default PasswordUpdateView;
