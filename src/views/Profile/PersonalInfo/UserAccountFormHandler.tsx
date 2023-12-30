import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import i18n, { langTokens } from '../../../locales/localizationInit';
import { UserAccountButton } from '../../../components/Form';
import { CreateUserAccountForm } from '../../../components/Form/СreateUserAccountForm';
import { IExpert, UserStatus } from '../../../old/lib/types';
import { useStyles } from './styles/PersonalInfo.styles';
import {
  changeEnabledOfUser,
  getAllEmails,
  sendActivationTokenToUser,
} from '../../../old/lib/utilities/API/api';
import { UserEmailType } from './types';

interface IUserAccountFormHandlerProps {
  isCurrentUser?: boolean;
  author?: IExpert;
  isAdmin?: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserAccountFormHandler: React.FC<IUserAccountFormHandlerProps> = ({
  isAdmin,
  isCurrentUser,
  author,
  isLoading,
  setIsLoading,
}) => {
  const [toggleButton, setToggleButton] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [enabled, setEnabled] = useState(author?.enabled);
  const [usersEmails, setUsersEmails] = useState<UserEmailType>({
    publicEmail: [],
    privateEmail: [],
  });
  const status = author?.status;
  const classes = useStyles();

  const fetchAllEmails = async () => {
    try {
      const response = await getAllEmails();
      setUsersEmails(response.data);
    } catch (err) {
      toast.error(i18n.t(langTokens.common.failedToFetchEmails));
    }
  };

  useEffect(() => {
    fetchAllEmails();
  }, []);

  const handleChangeEnabled = async () => {
    try {
      if (author) {
        setIsLoading(true);
        await changeEnabledOfUser({
          enabled: !enabled,
          id: author?.id,
        });

        setEnabled((prevState) => !prevState);
        setToggleButton(false);
      }
    } catch (err) {
      toast.error(i18n.t(langTokens.common.failedToChangeEnabled));
    } finally {
      setIsLoading(false);
    }
  };
  const handleActivateUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
  ) => {
    e.preventDefault();
    try {
      if (author) {
        setIsLoading(true);
        await sendActivationTokenToUser({
          email,
          id: author.id,
        });
        toast.success(i18n.t(langTokens.admin.emailConfirmationWasSent));
        await fetchAllEmails();
      }
    } catch (err) {
      toast.error(i18n.t(langTokens.common.failedToSendEmail));
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdmin && author && !isCurrentUser) {
    return (
      <Container>
        {toggleButton && (
          <>
            {!openForm && (
              <>
                <Box className={classes.ButtonBox}>
                  <Typography variant="h5">
                    {i18n.t(langTokens.admin.activateOrCreateUserAccount)}
                  </Typography>
                </Box>
                <Box className={classes.ButtonBox}>
                  <UserAccountButton
                    type="activate"
                    label={i18n.t(langTokens.admin.activateExistingAccount)}
                    onClick={handleChangeEnabled}
                    disabled={isLoading}
                  />
                  <UserAccountButton
                    type="create"
                    disabled={isLoading}
                    label={i18n.t(langTokens.admin.createUserAccount)}
                    onClick={() => setOpenForm(true)}
                  />
                </Box>
              </>
            )}
            {openForm && (
              <Box className={classes.ButtonBox}>
                <CreateUserAccountForm
                  usersEmails={usersEmails}
                  onClick={handleActivateUser}
                  isLoading={isLoading}
                />
              </Box>
            )}
          </>
        )}
        <Box className={classes.ButtonBox}>
          {enabled && status === UserStatus.ACTIVE && (
            <UserAccountButton
              type="deactivate"
              label={i18n.t(langTokens.admin.deactivateUserAccount)}
              onClick={handleChangeEnabled}
              disabled={isLoading}
            />
          )}
          {!enabled && !toggleButton && status === UserStatus.ACTIVE && (
            <UserAccountButton
              type="activate"
              label={i18n.t(langTokens.admin.activateUserAccount)}
              onClick={() => setToggleButton(true)}
            />
          )}
          {!enabled && status === UserStatus.NEW && (
            <>
              {!openForm && (
                <UserAccountButton
                  type="create"
                  label={i18n.t(langTokens.admin.createUserAccount)}
                  onClick={() => setOpenForm(true)}
                />
              )}
              {openForm && (
                <CreateUserAccountForm
                  usersEmails={usersEmails}
                  onClick={handleActivateUser}
                  currentUserEmail={author.email}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </Box>
      </Container>
    );
  }

  return <></>;
};

export default UserAccountFormHandler;
