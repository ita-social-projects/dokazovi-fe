import React from 'react';
import NewestContainer from './NewestContainer';
import ImportantContainer from './ImportantContainer';

export interface IMainViewProps {}

const MainView: React.FC<IMainViewProps> = (props) => {
  return (
    <>
      <ImportantContainer />
      <NewestContainer />
    </>
  );
};

export default MainView;
