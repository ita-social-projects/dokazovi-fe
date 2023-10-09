import React, { useMemo, useState } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import i18n from 'i18next';
import { langTokens } from '../../../locales/localizationInit';
import { UserAccountButton } from '../Buttons';
import { useStyles } from './styles/CreateUserAccountForm.style';
import { regex } from '../../../views/Profile/PersonalInfo/constants/regex';

type CreateUserAccountFormPropsType = {
  email: string;
  usersEmails: string[];
  onClick: () => void;
};
type ErrorFieldsType = {
  email: string;
};
type VisitedFieldsType = {
  email: boolean;
};
export const CreateUserAccountForm: React.FC<CreateUserAccountFormPropsType> = ({
  email,
  onClick,
  usersEmails,
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

    if (!userEmail && visitFields.email) {
      errors.email = i18n.t(langTokens.admin.fieldCantBeEmpty);
    } else if (userEmail && !regex.validEmail.test(userEmail)) {
      errors.email = i18n.t(langTokens.admin.wrongEmail);
    } else if (userEmail && userEmail === email) {
      errors.email = i18n.t(langTokens.admin.diffEmail);
    } else if (!userEmail && !visitFields.email) {
      errors.email = ' ';
    } else if (userEmail && usersEmails.some((mail) => mail === userEmail)) {
      errors.email = i18n.t(langTokens.admin.userEmailIsAlreadyExisting);
    }
    return errors;
  }, [userEmail, email, visitFields, usersEmails]);

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
          onChange={(e) => emailChangeHandler(e)}
          inputProps={{
            'data-testid': 'createAccountInput',
          }}
        />
        <UserAccountButton
          disabled={!!errorMessage.email}
          type="create"
          action="submit"
          onClick={onClick}
          label={i18n.t(langTokens.admin.sendEmailToCreateUserAccount)}
        />
      </Box>
    </form>
  );
};
