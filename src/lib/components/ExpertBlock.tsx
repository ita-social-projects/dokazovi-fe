import React from 'react';
import { IExpert } from '../types';

interface IExpertProps {
  expert: IExpert[];
}

export const ExpertBlock: React.FC<IExpertProps> = (props) => {
  const { expert } = props;
  const Cards = expert.map((card) => {
    return (
      <img
        src={card.photo}
        alt="doctor"
        key={card.phone}
      />
    );
  });
  return <div>{Cards}</div>;
};
