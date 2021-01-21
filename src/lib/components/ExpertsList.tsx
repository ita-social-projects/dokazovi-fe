import { Grid } from '@material-ui/core';
import React from 'react';
import { IExpert } from '../types';
import ExpertPhotoDataCard from './ExpertPhotoDataCard';

export interface IExpertsListProps {
  experts: IExpert[];
}

const ExpertsList: React.FC<IExpertsListProps> = (props) => {
  const { experts } = props;

  return (
    <>
      {experts.map((expert) => (
        <Grid item xs={12} md={12} lg={6} key={expert.id}>
          <ExpertPhotoDataCard expert={expert} />
        </Grid>
      ))}
    </>
  );
};

export default ExpertsList;
