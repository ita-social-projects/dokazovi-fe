import { Grid } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { LOAD_EXPERTS_LIMIT } from '../../constants/experts';
import { IExpert } from '../../types';
import ExpertPhotoDataCard from './ExpertPhotoDataCard';

export interface IExpertsListProps {
  experts: IExpert[];
}

// eslint-disable-next-line react/display-name
export const ExpertsList = forwardRef<HTMLDivElement, IExpertsListProps>(
  ({ experts }, nodeToScrollToRef) => {
    const expertsToScrollIntoViewIdx = experts.length - LOAD_EXPERTS_LIMIT;

    return (
      <Grid container spacing={3}>
        {experts.map((expert, idx) => (
          <Grid
            item
            md={4}
            lg={4}
            key={expert.id}
            ref={expertsToScrollIntoViewIdx === idx ? nodeToScrollToRef : null}
          >
            <ExpertPhotoDataCard expert={expert} key={expert.id} />
          </Grid>
        ))}
      </Grid>
    );
  },
);
