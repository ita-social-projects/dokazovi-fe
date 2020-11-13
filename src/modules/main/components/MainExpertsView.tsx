import React from 'react';
import { ExpertBlock } from '../../../lib/components/ExpertBlock';
import { useStyles } from '../styles/MainExpertsView.styles';
import cards from '../mockDataExperts';

const cardsClasses = Array.from(Array(11).keys()).map((el) => `item_${el}`);

export const MainExpertsView: React.FC = () => {
  const classes = useStyles();

  const allExperts = cards.map((card, key) => (
    <div key={card.phone} className={classes[cardsClasses[key]] as string}>
      <ExpertBlock expert={card} />
    </div>
  ));

  return <div className={classes.container}>{allExperts}</div>;
};
