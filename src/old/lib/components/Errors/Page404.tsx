import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PageTitle } from 'components/Page/PageTitle';
import { setGALocation } from '../../../../utilities/setGALocation';
import { langTokens } from '../../../../locales/localizationInit';

export interface IPage404Props {
  message?: string;
}

const Page404: React.FC<IPage404Props> = ({ message }) => {
  const { t } = useTranslation();

  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <div style={{ margin: 'auto' }}>
      <PageTitle title={t(langTokens.common.error404)} />
      <Typography align="center" variant="h1">
        {message || t(langTokens.common.error404Message)}
      </Typography>
    </div>
  );
};

export default Page404;
