import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import {
  fetchExperts,
  setExpertsPage,
  setExpertsRegionsFilter,
  setExpertsDirectionsFilter,
} from '../store/expertsSlice';
import { RootStateType } from '../../../store/rootReducer';
import ExpertsList from '../../../lib/components/ExpertsList';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import { useStyles } from '../styles/ExpertsView.styles';
import { FilterTypeEnum } from '../../../lib/types';
import { FilterFormContainer } from '../../../lib/components/FilterFormContainer';
import { selectExpertsByIds } from '../../../store/selectors';

const ExpertsView: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    expertIds,
    meta: { totalPages, pageNumber, loading },
    filters,
  } = useSelector((state: RootStateType) => state.experts.experts);

  const experts = selectExpertsByIds(expertIds);

  const regions = useSelector(
    (state: RootStateType) => state.properties?.regions,
  );

  const directions = useSelector(
    (state: RootStateType) => state.properties?.directions,
  );

  const expertsPropertiesLoaded = !!regions.length && !!directions.length;

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
  }, [filters?.REGIONS.value, filters?.DIRECTIONS.value]);

  return (
    <>
      <Container fixed>
        {expertsPropertiesLoaded && (
          <Container>
            <Grid container direction="column">
              <FilterFormContainer
                setFilter={setExpertsRegionsFilter}
                filterProperties={regions}
                filterType={FilterTypeEnum.REGIONS}
              />

              <FilterFormContainer
                setFilter={setExpertsDirectionsFilter}
                filterProperties={directions}
                filterType={FilterTypeEnum.DIRECTIONS}
              />
            </Grid>
          </Container>
        )}
        <Box mt={2}>
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
            <Container>
              <Grid container spacing={4} direction="row">
                <ExpertsList experts={experts} />
              </Grid>
              <Box mt={2} mb={2}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                >
                  <Pagination
                    count={totalPages}
                    page={pageNumber}
                    onChange={handlePageChange}
                  />
                </Grid>
              </Box>
            </Container>
          )}
        </Box>
      </Container>
    </>
  );
};

export default ExpertsView;
