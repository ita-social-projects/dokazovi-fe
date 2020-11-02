import React from 'react';

export interface IExpertViewProps {
  name: string,
}

const ExpertView: React.FC<IExpertViewProps> = (props) => {

  return (
    <React.Fragment>
      <span>ExpertView</span>
      <span>{props.name}</span>
    </React.Fragment>
  );
};

export default ExpertView;
