/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useStyles } from './styles/DirectionView.styles';
import { DIRECTION_PROPERTIES } from '../../../lib/constants/direction-properties';
import BorderBottom from '../../../lib/components/Border';
import { RootStateType } from '../../../store/rootReducer';
import { fetchExperts, setupDirection, fetchCourses } from '../store/directionSlice';
import { ExpertsView } from '../../../lib/components/ExpertsView';
import { IDirection } from '../../../lib/types';
import Carousel from '../../../lib/components/Carousel';
import { CourseCard } from '../../../lib/components/CourseCard';


import MaterialsContainer from './MaterialsContainer';

export interface IDirectionViewProps {}

const DirectionView: React.FC<IDirectionViewProps> = () => {
  const { pathname } = useLocation();
  const directions = Object.values(DIRECTION_PROPERTIES);
  const currentDirection = directions.find(
    (direction) => direction.route === pathname.split('/')[2],
  ) as IDirection; // TODO: validate route!

  const dispatch = useDispatch();

  dispatch(setupDirection(currentDirection.name));

  useEffect(() => {
    dispatch(
      fetchExperts(currentDirection.name, currentDirection.id as number),
    );
  }, []);

  useEffect(() => {
    dispatch(fetchCourses(currentDirection.name));
  }, []);
  
  const courseCards = useSelector((state: RootStateType) => state.directions[currentDirection.name]?.courses);
  
  const expertsCards = useSelector(
    (state: RootStateType) => state.directions[currentDirection.name]?.experts,
  );

  const classes = useStyles();

  return (
    <>
      {currentDirection ? (
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
              {expertsCards && <ExpertsView cards={expertsCards} />}
              <Box className={classes.moreExperts}>
                <Typography variant="h5" align="right" display="inline">
                  Більше експертів
                </Typography>
                <ArrowForwardIosIcon />
              </Box>
            </Grid>
            <BorderBottom />
            <Grid item xs={12}>
              <MaterialsContainer direction={currentDirection} />
            </Grid>
            <Grid item xs={12}>
            <Carousel>
                {/* {courseCards.map((p) => (
                  <div key={p.title}>
                    <CourseCard course={p} />
                  </div>
                ))} */}
              </Carousel>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <>
          <Typography variant="h3">Direction not found</Typography>
        </>
      )}
    </>
  );
};

export default DirectionView;
