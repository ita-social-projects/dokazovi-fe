import React from 'react';
import { useSelector } from 'react-redux';
import { ExpertBlock } from '../../../lib/components/ExpertBlock';
import { useStyles } from '../styles/MainExpertsView.styles';
import { IExpert } from '../../../lib/types';
import { store } from '../../../store/store';
import mockCards from '../mockDataExperts';
import { LoadData } from '../store/actionTypes';

interface IRootState {
  main: {
    experts: IExpert[];
  };
}

const cardsClasses = Array.from(Array(11).keys()).map((el) => `item_${el}`);

const MOCK_DATA_EXPERTS = {
  type: LoadData.LOAD_EXPERTS,
  value: mockCards,
};
store.dispatch(MOCK_DATA_EXPERTS);

export const MainExpertsView: React.FC = () => {
  const experts = (state: IRootState) => state.main.experts;
  const cards = useSelector(experts);
  const classes = useStyles();

  const allExperts = cards.map((card, key) => (
    <div key={card.phone} className={classes[cardsClasses[key]] as string}>
      <ExpertBlock expert={card} />
    </div>
  ));

  return <div className={classes.container}>{allExperts}</div>;
};
