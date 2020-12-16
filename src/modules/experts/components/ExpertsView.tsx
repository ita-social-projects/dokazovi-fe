import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../store/rootReducer';
import ExpertPhotoDataCard from '../../../lib/components/ExpertPhotoDataCard';
import { FilterForm } from '../../../lib/components/FilterForm';
import { fetchExperts } from '../store/expertsSlice';

export interface IExpertsViewProps {}

const selectExpertsList = (state: RootStateType) => state.experts.experts;

const ExpertsView: React.FC<IExpertsViewProps> = () => {
  const dispatch = useDispatch();

  const { experts, filters } = useSelector(selectExpertsList);

  useEffect(() => {
    dispatch(fetchExperts());
  }, [filters?.REGIONS.value]);

  return (
    <>
      <Container>
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item xs={5}>
            <FilterForm />
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
