import { Grid } from '@material-ui/core';
import React from 'react';
import { IExpert } from '../../types';
import ExpertPhotoDataCard from './ExpertPhotoDataCard';

export interface IExpertsListProps {
  experts: IExpert[];
}

const ExpertsList: React.FC<IExpertsListProps> = (props) => {
  const { experts } = props;

  return (
    <Grid container spacing={3}>
      {experts.map((expert) => (
        <Grid item md={4} lg={4} key={expert.id}>
          <ExpertPhotoDataCard expert={expert} key={expert.id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ExpertsList;
