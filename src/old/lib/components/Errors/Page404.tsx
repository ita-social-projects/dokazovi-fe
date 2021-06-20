import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../Pages/PageTitle';
import { setGALocation } from '../../../../utilities/setGALocation';
import { langTokens } from '../../../../locales/localizationInit';

const Page404: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <>
      <PageTitle title={`${t(langTokens.common.error)} 404`} />
      <Typography align="center" variant="h1">
        404 Page not found
      </Typography>
    </>
  );
};

export default Page404;
