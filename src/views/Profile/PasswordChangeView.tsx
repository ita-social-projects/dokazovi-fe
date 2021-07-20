import { Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';
import { useStyles } from './styles/PasswordChangeView.styles';
import { emailValidationObj } from '../../old/lib/components/Users/validationRules';
import { IAuthInputs } from '../../old/lib/types';
import { changePasswordRequest } from '../../old/lib/utilities/API/api';
import { BasicAcceptButton, BasicInput } from '../../components/Form';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const PasswordChangeView = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, watch, formState } = useForm<
    IAuthInputs
  >({
    mode: 'onTouched',
  });

  const onSubmit = async (inputs: IAuthInputs) => {
    try {
      await changePasswordRequest(inputs.email, inputs.password);
    } finally {
      setSubmitted(true);
    }
  };

  const passwordChangeView = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BasicInput
        name="email"
        inputRef={register(emailValidationObj)}
        label="E-mail"
        error={!!errors.email}
        helperText={errors?.email?.message}
      />
      <BasicInput
        name="password"
        label={t(langTokens.passwordForms.oldPassword)}
        type="password"
        inputRef={register()}
      />
      <BasicAcceptButton
        label={t(langTokens.common.acceptChanges)}
        disabled={
          !formState.isValid ||
          watch('email')?.length === 0 ||
          watch('password')?.length === 0
        }
      />
    </form>
  );

  const submittedView = (
    <Container>
      <Typography variant="h3" component="p" className={classes.centerText}>
        {`${t(langTokens.passwordForms.changePassowrdFromEmail)}!`}
      </Typography>
      <BasicAcceptButton
        label={t(langTokens.passwordForms.repeateAgain)}
        onClick={() => {
          setSubmitted(false);
        }}
      />
    </Container>
  );
  if (submitted) {
    return submittedView;
  }
  return passwordChangeView;
};
