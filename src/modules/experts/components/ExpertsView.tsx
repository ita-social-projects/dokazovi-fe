import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { fetchExperts, setExpertsPage } from '../store/expertsSlice';
import { RootStateType } from '../../../store/rootReducer';
import ExpertPhotoDataCard from '../../../lib/components/ExpertPhotoDataCard';
import ExpertsList from '../../../lib/components/ExpertsList';
import { useStyles } from '../styles/ExpertsView.styles';

export interface IExpertsViewProps {}

const selectExperts = (state: RootStateType) => state.experts.experts;

const ExpertsView: React.FC<IExpertsViewProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    experts,
    meta: { totalPages, pageNumber },
  } = useSelector(selectExperts);

  const setExperts = () => dispatch(fetchExperts());

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    dispatch(setExpertsPage(page));
  };

  useEffect(() => {
    setExperts();
  }, []);

  return (
    <>
      <Container className={classes.root}>
        <Grid container spacing={4} direction="row" alignItems="center">
          <ExpertsList experts={experts} />
        </Grid>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Pagination
            className={classes.pagination}
            count={totalPages}
            page={pageNumber}
            onChange={handlePageChange}
          />
        </Grid>
      </Container>
    </>
  );
};

export default ExpertsView;
