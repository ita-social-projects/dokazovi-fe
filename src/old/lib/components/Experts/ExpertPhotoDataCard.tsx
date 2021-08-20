import React from 'react';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import { IExpert } from '../../types';
import { useStyles } from '../../styles/ExpertPhotoDataCard.styles';
import { ExpertDataCard } from './ExpertDataCard';
import { ExpertBlock } from './ExpertBlock';

export interface IExpertPhotoDataCardProps {
  expert: IExpert;
}

const ExpertPhotoDataCard: React.FC<IExpertPhotoDataCardProps> = (props) => {
  const { expert } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={`/experts/${expert.id}`}>
      <Box className={classes.photo}>
        <ExpertBlock expert={expert} />
      </Box>
      <ExpertDataCard expert={expert} />
      </Link>
    </Card>
  );
};

export default ExpertPhotoDataCard;
