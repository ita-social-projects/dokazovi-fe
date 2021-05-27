import { Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { LOAD_EXPERTS_LIMIT } from '../../constants/experts';
import { IExpert } from '../../types';
import ExpertPhotoDataCard from './ExpertPhotoDataCard';

export interface IExpertsListProps {
  experts: IExpert[];
}

export const ExpertsList: React.FC<IExpertsListProps> = ({ experts }) => {
  const expertIdxForScroll = experts.length - LOAD_EXPERTS_LIMIT;
  const expertForScrollRef = useRef<HTMLDivElement>(null);

  const [prevExpertsCount, setPrevExpertsLength] = useState(experts.length);

  useEffect(() => {
    if (!expertForScrollRef.current) return;
    if (
      experts.length > LOAD_EXPERTS_LIMIT &&
      experts.length !== prevExpertsCount
    ) {
      expertForScrollRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
    setPrevExpertsLength(experts.length);
  }, [experts.length]);

  return (
    <Grid container spacing={3}>
      {experts.map((expert, idx) => (
        <Grid
          item
          md={4}
          lg={4}
          key={expert.id}
          ref={expertIdxForScroll === idx ? expertForScrollRef : null}
        >
          <ExpertPhotoDataCard expert={expert} key={expert.id} />
        </Grid>
      ))}
    </Grid>
  );
};
