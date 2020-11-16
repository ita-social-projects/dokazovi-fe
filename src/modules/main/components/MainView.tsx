import React from 'react';
import NewestContainer from './NewestContainer';
import ImportantContainer from './ImportantContainer';
import { MainExpertsView } from './MainExpertsView';

export interface IMainViewProps {}

const MainView: React.FC<IMainViewProps> = () => {
  return (
    <>
      <ImportantContainer />
      <NewestContainer />
      <MainExpertsView />
    </>
  );
};

export default MainView;
