import React from 'react';
import { ExpertBlock } from './ExpertBlock';
import cards from '../constants/mockDataCards';

export const Experts: React.FC = () => {
  return (
    <div>
      <ExpertBlock infoCards={cards}/>
    </div>
  );
};
