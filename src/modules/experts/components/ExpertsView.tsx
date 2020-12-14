import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../store/rootReducer';
import ExpertPhotoDataCard from '../../../lib/components/ExpertPhotoDataCard';

export interface IExpertsViewProps {}

const selectMainExperts = (state: RootStateType) => state.main.experts;

const ExpertsView: React.FC<IExpertsViewProps> = () => {
  const { experts } = useSelector(selectMainExperts);

  return (
    <>
      <Container>
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item xs={5}>
            {experts.map((expert) => (
              <div key={expert.id}>
                <ExpertPhotoDataCard expert={expert} />
              </div>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ExpertsView;
