import React from 'react';
import { ExpertBlock } from './ExpertBlock';
import cards from '../../modules/experts/mockDataCards';

export const Experts: React.FC = () => {
  const allExperts = cards.map(card => {
    return <ExpertBlock expert={card} key={card.phone}/>;
  });
  return (
    <div>
      {allExperts}
    </div>
  );
};
