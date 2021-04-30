import React from 'react';
import NewestContainer from './NewestContainer';
import ImportantContainer from './ImportantContainer';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';

const MainView: React.FC = () => (
  <>
    <PageTitle title="Головна" />
    <ImportantContainer />
    <NewestContainer />
  </>
);

export default MainView;
