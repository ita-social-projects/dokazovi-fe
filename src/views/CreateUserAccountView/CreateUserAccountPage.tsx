import React, { useState } from 'react';

import { Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { useQuery } from '../../old/lib/hooks/useQuery';
import { langTokens } from '../../locales/localizationInit';
import { BasicButton, BasicInput } from '../../components/Form';
import { passwordValidationObj } from '../../old/lib/components/Users/validationRules';
import { useStyles } from './CreateUserAccountPage.style';
import { activateUser } from '../../old/lib/utilities/API/api';
import { LoadingStatusEnum, LoadingStatusType } from '../../old/lib/types';

interface ICreateUserAccount {
  newPassword: string;
  matchPassword: string;
}

const CreateUserAccountPage = () => {
  const query = useQuery();
  const history = useHistory();
  const { t } = useTranslation();

  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, watch, formState } = useForm<
    ICreateUserAccount
  >({
    mode: 'onTouched',
  });

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
    LoadingStatusEnum.idle,
  );

  const onSubmit = async (inputs: ICreateUserAccount) => {
    const token = query.get('token');
    if (!token) {
      toast.error('No token provided');
      return;
    }
    try {
      setLoadingStatus(LoadingStatusEnum.pending);
      await activateUser(token, inputs.newPassword, inputs.matchPassword);
      toast.success('User was activated');
      setLoadingStatus(LoadingStatusEnum.succeeded);
    } catch (err) {
      toast.error('Error activating user');
      setLoadingStatus(LoadingStatusEnum.idle);
    }
  };

  const loadingView = (
    <Box className="mainLoading">
      <CircularProgress />
    </Box>
  );

  const createUserAccSuccess = (
    <Container className={classes.SuccessContainer}>
      <Typography variant="h3" component="p" className={classes.successText}>
        {`${t(langTokens.passwordForms.createUserSuccess)}!`}
      </Typography>
      <Box className={classes.SuccessButtonBox}>
        <BasicButton
          type="accept"
          label={t(langTokens.passwordForms.goToHome)}
          onClick={() => history.push('/opendoctorgate')}
        />
      </Box>
    </Container>
  );

  const createUserAccForm = (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.FormBox}>
        <Typography variant="h3" component="p">
          {`${t(langTokens.passwordForms.createUserAccountTitle)}:`}
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

        <Box className={classes.ButtonBox}>
          <BasicButton
            type="accept"
            label={t(langTokens.common.acceptChanges)}
            disabled={
              !formState.isValid ||
              watch('newPassword')?.length === 0 ||
              watch('matchPassword')?.length === 0
            }
          />
        </Box>
      </form>
    </Container>
  );

  if (loadingStatus === LoadingStatusEnum.idle) {
    return createUserAccForm;
  }

  if (loadingStatus === LoadingStatusEnum.succeeded) {
    return createUserAccSuccess;
  }

  if (loadingStatus === LoadingStatusEnum.pending) {
    return loadingView;
  }

  return <Redirect to="/" />;
};

export default CreateUserAccountPage;
