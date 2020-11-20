import React from 'react';
import { Container, Grid } from '@material-ui/core';
import NewestContainer from './NewestContainer';
import ImportantContainer from './ImportantContainer';
import { MainExpertsView } from './MainExpertsView';

export interface IMainViewProps {}

const MainView: React.FC<IMainViewProps> = () => {
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
            <MainExpertsView />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainView;
