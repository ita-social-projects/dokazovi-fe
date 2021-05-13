import React from 'react';
import ImportantContainer from './ImportantContainer';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { NewestContainer } from '../../../../features/newest/NewestContainer';

const MainView: React.FC = () => (
  <>
    <PageTitle title="Головна" />
    <ImportantContainer />
    <NewestContainer />
  </>
);

export default MainView;
