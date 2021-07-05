import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { LoadingStatusEnum } from '../../types';
import i18n, { langTokens } from '../../../../locales/localizationInit';

export interface ILoadingInfoProps {
  loading: LoadingStatusEnum;
  errorMsg?: string;
}

export const LoadingInfo: React.FC<ILoadingInfoProps> = ({
  loading,
  errorMsg = i18n.t(langTokens.materials.materialsLoadingFail),
}) => {
  const renderLoading = () =>
    loading === LoadingStatusEnum.pending ? <CircularProgress /> : null;

  const renderError = () =>
    loading === LoadingStatusEnum.failed ? <span>{errorMsg}</span> : null;

  return (
    <>
      {renderLoading()}
      {renderError()}
    </>
  );
};
