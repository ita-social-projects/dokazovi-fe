import React from 'react';
import ImportantContainer from './ImportantContainer';

export interface IMainViewProps {}

const MainView: React.FC<IMainViewProps> = (props) => {
  return (
    <>
      <ImportantContainer />
    </>
  );
};

export default MainView;
