import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExpertBlock } from '../../../lib/components/ExpertBlock';
import { useStyles } from '../styles/MainExpertsView.styles';
import { loadExperts } from '../store/actions';
import { IRootState } from '../../../store/rootReducer';

const cardsClasses = Array.from(Array(11).keys()).map((el) => `item_${el}`);
const selectExperts = (state: IRootState) => state.main.experts;

export const MainExpertsView: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(loadExperts());

  const cards = useSelector(selectExperts);
  const classes = useStyles();

  const allExperts = cards.map((card, key) => (
    <div key={card.phone} className={classes[cardsClasses[key]] as string}>
      <ExpertBlock expert={card} />
    </div>
  ));

  return <div className={classes.container}>{allExperts}</div>;
};
