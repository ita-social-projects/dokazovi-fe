import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useStyles } from './styles/DirectionView.styles';
import { DIRECTION_PROPERTIES } from '../../../lib/constants/direction-properties';
import BorderBottom from '../../../lib/components/Border';
import { RootStateType } from '../../../store/rootReducer';
import { fetchExperts } from '../store/directionSlice';
import { ExpertsView } from '../../../lib/components/ExpertsView';

export interface IDirectionViewProps {}

const selectDirectionExperts = (state: RootStateType) =>
  state.direction.experts;

const DirectionView: React.FC<IDirectionViewProps> = () => {
  const { pathname } = useLocation();
  const directions = Object.values(DIRECTION_PROPERTIES);
  const currentDirection = directions.find(
    (value) => value.route === pathname.split('/')[2],
  );

  const dispatch = useDispatch();
  dispatch(fetchExperts());
  const expertsCards = useSelector(selectDirectionExperts);

  const classes = useStyles();

  return (
    <>
      <Container>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} className={classes.header}>
            <Box
              color="disabled"
              className={classes.icon}
              style={{ backgroundColor: currentDirection?.color }}
            />
            <Typography variant="h2">{currentDirection?.name}</Typography>
          </Grid>
          <BorderBottom />
          <Grid item xs={12}>
            <ExpertsView cards={expertsCards} />
            <Box className={classes.moreExperts}>
              <Typography variant="h5" align="right" display="inline">
                Більше експертів
              </Typography>
              <ArrowForwardIosIcon />
            </Box>
          </Grid>
          <BorderBottom />
          <Grid item xs={12}>
            {/* <MaterialsView /> */}
          </Grid>
          <Grid item xs={12}>
            {/* <CoursesView /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DirectionView;
