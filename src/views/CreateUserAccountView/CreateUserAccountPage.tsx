import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useQuery } from '../../old/lib/hooks/useQuery';
import { activateUser } from '../../old/lib/utilities/API/api';
import { LoadingStatusEnum, LoadingStatusType } from '../../old/lib/types';
import CreateUserAccountPageForm from './CreateUserAccountPageForm';
import { ICreateUserAccount } from './types';
import CreateUserAccountPageSuccess from './CreateUserAccountPageSuccess';
import i18n from 'i18next';
import { langTokens } from '../../locales/localizationInit';

const CreateUserAccountPage = () => {
  const query = useQuery();

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
    LoadingStatusEnum.idle,
  );

  const onSubmit = async (inputs: ICreateUserAccount) => {
    const token = query.get('token');
    if (!token) {
      toast.error(i18n.t(langTokens.common.noTokenProvided));
      return;
    }
    try {
      setLoadingStatus(LoadingStatusEnum.pending);
      await activateUser(token, inputs.newPassword, inputs.matchPassword);
      toast.success(i18n.t(langTokens.common.userWasActivated));
      setLoadingStatus(LoadingStatusEnum.succeeded);
    } catch (err) {
      toast.error(i18n.t(langTokens.common.errorActivatingUser));
      setLoadingStatus(LoadingStatusEnum.idle);
    }
  };

  const loadingView = (
    <Box className="mainLoading">
      <CircularProgress />
    </Box>
  );

  if (loadingStatus === LoadingStatusEnum.idle) {
    return <CreateUserAccountPageForm onSubmit={onSubmit} />;
  }

  if (loadingStatus === LoadingStatusEnum.succeeded) {
    return <CreateUserAccountPageSuccess />;
  }

  if (loadingStatus === LoadingStatusEnum.pending) {
    return loadingView;
  }

  return <Redirect to="/" />;
};

export default CreateUserAccountPage;
