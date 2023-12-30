import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Container, Typography } from '@material-ui/core';
import i18n from 'i18next';
import { langTokens } from '../../locales/localizationInit';
import { BasicButton, BasicInput } from '../../components/Form';
import { passwordValidationObj } from '../../old/lib/components/Users/validationRules';
import { useStyles } from './CreateUserAccountPage.style';
import { ICreateUserAccount } from './types';

interface ICreateUserAccountPageProps {
  onSubmit: (inputs: ICreateUserAccount) => Promise<void>;
}

const CreateUserAccountPageForm: React.FC<ICreateUserAccountPageProps> = ({
  onSubmit,
}) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, watch, formState } = useForm<
    ICreateUserAccount
  >({
    mode: 'onTouched',
  });

  const classes = useStyles();

  const createUserAccForm = (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.FormBox}>
        <Typography variant="h3" component="p">
          {`${i18n.t(langTokens.passwordForms.createUserAccountTitle)}:`}
        </Typography>

        <BasicInput
          name="newPassword"
          type="password"
          label={i18n.t(langTokens.passwordForms.newPassword)}
          inputRef={register(passwordValidationObj)}
          error={!!errors.newPassword}
          helperText={errors?.newPassword?.message}
        />

        <BasicInput
          name="matchPassword"
          type="password"
          label={i18n.t(langTokens.passwordForms.newPasswordMatch)}
          inputRef={register({
            ...passwordValidationObj,
            validate: () => watch('newPassword') === watch('matchPassword'),
          })}
          error={!!errors.matchPassword}
          helperText={
            errors?.matchPassword?.message ||
            (errors.matchPassword?.type === 'validate' &&
              i18n.t(langTokens.passwordForms.passwordsNotMatch))
          }
        />

        <Box className={classes.ButtonBox}>
          <BasicButton
            type="accept"
            label={i18n.t(langTokens.common.acceptChanges)}
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

  return createUserAccForm;
};

export default CreateUserAccountPageForm;
