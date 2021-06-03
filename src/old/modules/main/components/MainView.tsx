import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { ImportantContainer } from './ImportantContainer';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { NewestContainer } from '../../../../features/newest/NewestContainer';

const MainView: React.FC = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <PageTitle title="Головна" />
      <ImportantContainer />
      <NewestContainer />
    </>
  );
};

export default MainView;
