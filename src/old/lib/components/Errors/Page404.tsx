import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { PageTitle } from '../Pages/PageTitle';
import { setGALocation } from '../../../../utilities/setGALocation';

const Page404: React.FC = () => {
  useEffect(() => {
    setGALocation(window);
  }, []);

  return (
    <>
      <PageTitle title="Помилка 404" />
      <Typography align="center" variant="h1">
        404 Page not found
      </Typography>
    </>
  );
};

export default Page404;
