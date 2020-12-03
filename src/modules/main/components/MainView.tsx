import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import NewestContainer from './NewestContainer';
import ImportantContainer from './ImportantContainer';
import { ExpertsView } from '../../../lib/components/ExpertsView';
import { RootStateType } from '../../../store/rootReducer';
import { fetchExperts } from '../store/mainSlice';

export interface IMainViewProps {}

const selectMainExperts = (state: RootStateType) => state.main.experts;

const MainView: React.FC<IMainViewProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExperts());
  }, []);

  const expertsCards = useSelector(selectMainExperts);

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
            <ExpertsView cards={expertsCards} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainView;
