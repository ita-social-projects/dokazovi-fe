import React from 'react';
import { ExpertBlock } from '../../lib/components/ExpertBlock';
import { useStyles } from './styles/Experts.style';
import cards from './mockDataCards';

const cardsClasses = Array.from(Array(11).keys()).map((el) => `item_${el}`);

export const Experts: React.FC = () => {
  const classes = useStyles();

  const allExperts = cards.map((card, key) => {
    return (
      <ExpertBlock
        expert={card}
        nameClass={cardsClasses[key]}
        key={card.phone}
      />
    );
  });

  return <div className={classes.container}>{allExperts}</div>;
};
