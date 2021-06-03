import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Typography } from '@material-ui/core';
import { PageTitle } from '../Pages/PageTitle';

const Page404: React.FC = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
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
