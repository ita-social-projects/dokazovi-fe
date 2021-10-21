import { Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BasicButton, BasicInput } from '../../components/Form';
import { langTokens } from '../../locales/localizationInit';
import { emailValidationObj } from '../../old/lib/components/Users/validationRules';
import { resetPasswordRequest } from '../../old/lib/utilities/API/api';
import { useStyles } from './PasswordResetView.style';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const PasswordResetView = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, watch, formState } = useForm<{
    email: string;
  }>({
    mode: 'onTouched',
  });

  const onSubmit = (inputs: { email: string }) => {
    setSubmitted(true);
    resetPasswordRequest(inputs.email);
  };

  const passwordResetView = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3">
        {`${t(langTokens.passwordForms.resetPasswordTitle)}:`}
      </Typography>

      <BasicInput
        name="email"
        inputRef={register(emailValidationObj)}
        label="E-mail"
        error={!!errors.email}
        helperText={errors?.email?.message}
      />

      <BasicButton
        type="accept"
        label={t(langTokens.common.acceptChanges)}
        disabled={!formState.isValid || watch('email')?.length === 0}
      />
    </form>
  );

  const submittedView = (
    <Container data-testid="submittedContainer">
      <Typography variant="h3" component="p" className={classes.centerText}>
        {`${t(langTokens.passwordForms.changePassowrdFromEmail)}!`}
      </Typography>
      <BasicButton
        type="accept"
        label={t(langTokens.passwordForms.repeateAgain)}
        onClick={() => {
          setSubmitted(false);
        }}
      />
    </Container>
  );

  return submitted ? submittedView : passwordResetView;
};

export default PasswordResetView;
