import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { fetchExperts, setExpertsPage } from '../store/expertsSlice';
import { RootStateType } from '../../../store/rootReducer';
import ExpertsList from '../../../lib/components/ExpertsList';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import { useStyles } from '../styles/ExpertsView.styles';
import { FilterForm } from '../../../lib/components/FilterForm';

export interface IExpertsViewProps {}

const selectExperts = (state: RootStateType) => state.experts.experts;

const ExpertsView: React.FC<IExpertsViewProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    experts,
    meta: { totalPages, pageNumber, loading },
    filters,
  } = useSelector(selectExperts);

  const regions = useSelector(
    (state: RootStateType) => state.properties?.regions,
  );

  const setExperts = () => dispatch(fetchExperts());

  const handlePageChange = (_, page: number) => {
    dispatch(setExpertsPage(page));
  };

  useEffect(() => {
    dispatch(setExpertsPage(1));
  }, []);

  useEffect(() => {
    setExperts();
  }, [pageNumber]);

  useEffect(() => {
    dispatch(fetchExperts());
  }, [filters?.REGIONS.value]);

  return (
    <>
      <Container fixed>
        {regions.length && (
          <Grid container>
            <FilterForm />
          </Grid>
        )}

        <div className={classes.container}>
          {loading === 'pending' ? (
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.loading}
            >
              <LoadingInfo loading={loading} />
            </Grid>
          ) : (
            <Container className={classes.root}>
              <Grid container spacing={4} direction="row" alignItems="center">
                <ExpertsList experts={experts} />
              </Grid>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
              >
                <Pagination
                  className={classes.pagination}
                  count={totalPages}
                  page={pageNumber}
                  onChange={handlePageChange}
                />
              </Grid>
            </Container>
          )}
        </div>
      </Container>
    </>
  );
};

export default ExpertsView;
