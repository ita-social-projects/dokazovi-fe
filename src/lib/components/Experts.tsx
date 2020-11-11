import React from 'react';
import { ExpertBlock } from './ExpertBlock';
import cards from '../../modules/experts/mockDataCards';

export const Experts: React.FC = () => {
  return (
    <div>
      <ExpertBlock expert={cards}/>
    </div>
  );
};
