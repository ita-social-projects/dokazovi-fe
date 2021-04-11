import React from 'react';
import { Typography } from '@material-ui/core';
import { PageTitle } from '../Pages/PageTitle';

const Page404: React.FC = () => {
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
