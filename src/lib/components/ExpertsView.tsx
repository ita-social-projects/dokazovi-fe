import React, { useState } from 'react';
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { ExpertBlock } from './ExpertBlock';
import { useStyles } from '../../modules/main/styles/MainExpertsView.styles';
import { ExpertPopover } from './ExpertPopover';
import ExpertDataCard from './ExpertDataCard';
import { IExpert, LoadingStatusEnum } from '../types';

const cardsClasses = Array.from(Array(11).keys()).map((el) => `item_${el}`);

export interface IExpertsViewProps {
  cards: IExpert[];
  loading?: LoadingStatusEnum;
}

export const ExpertsView: React.FC<IExpertsViewProps> = (props) => {
  const { cards, loading } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [popoverCard, setPopoverCard] = useState<IExpert | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLDivElement>,
    card: IExpert,
  ) => {
    setPopoverCard(card);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  const allExperts = cards.map((card, key) => (
    <div
      onMouseEnter={(event) => handlePopoverOpen(event, card)}
      onMouseLeave={handlePopoverClose}
      key={card.id}
      className={classes[cardsClasses[key]] as string}
    >
      <ExpertBlock expert={card} />
    </div>
  ));

  const renderError = (errorMsg = 'Не вдалося завантажити експертів') =>
    loading === LoadingStatusEnum.failed ? <span>{errorMsg}</span> : null;

  const renderLoading = () =>
    loading === LoadingStatusEnum.pending ? <CircularProgress /> : null;

  return (
    <Container>
      <Typography variant="h4">Експерти</Typography>
      <Grid container direction="column" alignItems="center">
        {renderLoading()}
        {renderError()}
      </Grid>
      <div className={classes.container}>
        {allExperts}
        <ExpertPopover
          anchorEl={anchorEl}
          handlePopoverClose={handlePopoverClose}
        >
          {popoverCard && <ExpertDataCard expert={popoverCard} />}
        </ExpertPopover>
      </div>
    </Container>
  );
};
