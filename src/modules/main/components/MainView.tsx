import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import NewestContainer from './NewestContainer';
import ImportantContainer from './ImportantContainer';
import { ExpertsViewCard } from '../../../lib/components/ExpertsViewCard';
import { RootStateType } from '../../../store/rootReducer';
import { fetchExperts } from '../store/mainSlice';

const MainView: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExperts());
  }, []);

  const {
    expertIds,
    meta: { loading },
  } = useSelector((state: RootStateType) => state.main.experts);
  const { experts: allExperts } = useSelector(
    (state: RootStateType) => state.data,
  );
  const experts = expertIds.map((id) => allExperts[id]);

  return (
    <>
      <Container>
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item xs={12}>
            <ImportantContainer />
          </Grid>
          <Grid item xs={12}>
            <NewestContainer />
          </Grid>
          <Grid item xs={12}>
            <ExpertsViewCard cards={experts} loading={loading} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainView;
