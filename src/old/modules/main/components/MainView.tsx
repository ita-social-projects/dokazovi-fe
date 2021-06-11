import React, { useEffect } from 'react';
import { ImportantContainer } from './ImportantContainer';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { NewestContainer } from '../../../../features/newest/NewestContainer';
import { setGALocation } from '../../../../utilities/setGALocation';

const MainView: React.FC = () => {
  useEffect(() => {
    setGALocation(window);
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
