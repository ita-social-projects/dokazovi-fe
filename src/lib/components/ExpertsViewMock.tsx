import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { IRootState } from '../../store/rootReducer';
import { loadExperts } from '../../modules/main/store/actions';

import { ExpertBlock } from './ExpertBlock';
import { useStyles } from '../../modules/main/styles/MainExpertsView.styles';
import { ExpertPopover } from './ExpertPopover';

const cardsClasses = Array.from(Array(11).keys()).map((el) => `item_${el}`);
const selectExperts = (state: IRootState) => state.main.experts;

export const ExpertsViewMock: React.FC = () => {
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
        <p>Это блок</p>
      </div>
      <ExpertPopover
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
      >
        <ExpertBlock expert={card} />
      </ExpertPopover>
    </>
  ));

  return <div className={classes.container}>{allExperts}</div>;
};
