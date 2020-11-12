import React from 'react';
import ExpertsGrid from '../../../lib/components/ExpertsGrid';

export interface IMainViewProps {}

const MainView: React.FC<IMainViewProps> = (props) => {
  return (
    <>
      MainView
      <ExpertsGrid experts={[]} />
    </>
  );
};

export default MainView;
