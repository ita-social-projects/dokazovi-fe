import React from 'react';
import { IExpert } from '../types';

interface IExpertProps {
  expert: IExpert;
}

export const ExpertBlock: React.FC<IExpertProps> = (props) => {
  const { expert } = props;
  return (
    <div>
      <img src={expert.photo} alt="doctor" key={expert.phone} />
    </div>
  );
};
