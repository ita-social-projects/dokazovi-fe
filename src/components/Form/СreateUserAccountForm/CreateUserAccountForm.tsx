import React, { useMemo, useState } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import i18n from 'i18next';
import { langTokens } from '../../../locales/localizationInit';
import { UserAccountButton } from '../Buttons';
import { useStyles } from './styles/CreateUserAccountForm.style';
import { regex } from '../../../views/Profile/PersonalInfo/constants/regex';
import { UserEmailType } from '../../../views/Profile/PersonalInfo/types';

type CreateUserAccountFormPropsType = {
  usersEmails: UserEmailType;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
  ) => void;
  currentUserEmail?: string;
  isLoading?: boolean;
};

const initialValues = {
  email: '',
};

type ErrorFieldsType = {
  [prop in keyof typeof initialValues]: string;
};
type VisitedFieldsType = {
  [prop in keyof typeof initialValues]: boolean;
};
export const CreateUserAccountForm: React.FC<CreateUserAccountFormPropsType> = ({
  onClick,
  usersEmails,
  currentUserEmail,
  isLoading,
}) => {
  const [userEmail, setUserEmail] = useState('');
  const [visitFields, setVisitFields] = useState<VisitedFieldsType>({
    email: false,
  });

  const classes = useStyles();
  const emailChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserEmail(e.target.value);
  };

  const errorMessage: ErrorFieldsType = useMemo(() => {
    const errors: ErrorFieldsType = {
      email: '',
    };

    if (currentUserEmail) {
      errors.email = i18n.t(langTokens.admin.emailConfirmationWasSent);
    } else if (!userEmail && visitFields.email) {
      errors.email = i18n.t(langTokens.admin.fieldCantBeEmpty);
    } else if (userEmail && !regex.validEmail.test(userEmail)) {
      errors.email = i18n.t(langTokens.admin.wrongEmail);
    } else if (
      userEmail &&
      usersEmails.publicEmail.some((mail) => mail === userEmail)
    ) {
      errors.email = i18n.t(langTokens.admin.diffEmail);
    } else if (!userEmail && !visitFields.email) {
      errors.email = ' ';
    } else if (
      userEmail &&
      usersEmails.privateEmail.some((mail) => mail === userEmail)
    ) {
      errors.email = i18n.t(langTokens.admin.userEmailIsAlreadyExisting);
    }
    return errors;
  }, [userEmail, visitFields, usersEmails]);

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClick(e, userEmail);
  };
  return (
    <form className={classes.Form}>
      {visitFields.email && errorMessage.email && (
        <Typography className={classes.Typography}>
          {errorMessage.email}
        </Typography>
      )}
      <Box className={classes.FormBox}>
        <TextField
          className={classes.TextField}
          variant="outlined"
          required
          name="userEmail"
          fullWidth
          onFocus={() => setVisitFields({ email: true })}
          label={i18n.t(langTokens.admin.email)}
          value={userEmail}
          onChange={emailChangeHandler}
          inputProps={{
            'data-testid': 'createAccountInput',
          }}
        />
        <UserAccountButton
          disabled={!!errorMessage.email || isLoading}
          type="create"
          action="submit"
          onClick={handleSubmitForm}
          label={i18n.t(langTokens.admin.sendEmailToCreateUserAccount)}
        />
      </Box>
    </form>
  );
};
