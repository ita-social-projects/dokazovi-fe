import React from 'react';

export interface IExpertViewProps {
  name: string,
}

const ExpertView: React.FC<IExpertViewProps> = ({name}) => {

  return (
    <>
      <span>ExpertView</span>
      <span>{name}</span>
    </>
  );
};

export default ExpertView;
