import React from 'react';
import NewestContainer from './NewestContainer';

export interface IMainViewProps {}

const MainView: React.FC<IMainViewProps> = (props) => {
  return (
    <>
      <NewestContainer />
    </>
  );
};

export default MainView;
