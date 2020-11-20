import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExpertBlock } from '../../../lib/components/ExpertBlock';
import { useStyles } from '../styles/MainExpertsView.styles';
import { loadExperts } from '../store/actions';
import { IRootState } from '../../../store/rootReducer';
import { ExpertPopover } from '../../../lib/components/ExpertPopover';
import ExpertDataCard from '../../../lib/components/ExpertDataCard';

const cardsClasses = Array.from(Array(11).keys()).map((el) => `item_${el}`);
const selectExperts = (state: IRootState) => state.main.experts;

export const MainExpertsView: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  dispatch(loadExperts());

  const cards = useSelector(selectExperts);
  const classes = useStyles();

  const allExperts = cards.map((card, key) => (
    <>
      <div
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        key={card.phone}
        className={classes[cardsClasses[key]] as string}
      >
        <ExpertBlock expert={card} />
      </div>
      <ExpertPopover
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
      >
        <ExpertDataCard expert={card} />
      </ExpertPopover>
    </>
  ));

  return (
    <>
      <h2>Експерти</h2>
      <div className={classes.container}> {allExperts}</div>
    </>
  );
};
