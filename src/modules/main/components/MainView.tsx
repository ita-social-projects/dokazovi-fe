import React from 'react';
import ImportantContainer from './ImportantContainer';
import { MainExpertsView } from './MainExpertsView';

export interface IMainViewProps {}

const MainView: React.FC<IMainViewProps> = () => {
  return (
    <>
      <ImportantContainer />
      <MainExpertsView />
    </>
  );
};

export default MainView;
