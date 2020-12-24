import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useStyles } from './styles/DirectionView.styles';
import BorderBottom from '../../../lib/components/Border';
import { RootStateType } from '../../../store/rootReducer';
import {
  fetchExperts,
  setupDirection,
  fetchCourses,
  setExpertsLoadingStatus,
  setPostFilters,
} from '../store/directionSlice';
import { ExpertsViewCard } from '../../../lib/components/ExpertsViewCard';
import { IDirection, LoadingStatusEnum, FilterTypeEnum } from '../../../lib/types';
import Carousel from '../../../lib/components/Carousel';
import { CourseCard } from '../../../lib/components/CourseCard';
import MaterialsContainer from './MaterialsContainer';

export interface IDirectionViewProps {}

const DirectionView: React.FC<IDirectionViewProps> = () => {
  const { pathname } = useLocation();
  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const currentDirection = directions.find(
    (direction) => direction.name === pathname.split('/')[2],
  ) as IDirection; // TODO: validate route!

  const dispatch = useDispatch();

  dispatch(setupDirection(currentDirection.name));

  useEffect(() => {
    dispatch(
      setExpertsLoadingStatus({
        directionName: currentDirection.name,
        status: LoadingStatusEnum.pending,
      }),
    );
    dispatch(
      fetchExperts(currentDirection.name, currentDirection.id as number),
    );
    dispatch(fetchCourses(currentDirection.name));
  }, []);

  const {
    experts: {
      expertsCards,
      meta: { loading },
    },
    courses,
  } = useSelector(
    (state: RootStateType) => state.directions[currentDirection.name],
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
              <Typography variant="h2">{currentDirection?.label}</Typography>
            </Grid>
            <BorderBottom />
            <Grid item xs={12}>
              {expertsCards && (
                <ExpertsViewCard cards={expertsCards} loading={loading} />
              )}
              <Box className={classes.moreExperts}>
                <Typography variant="h5" align="right" display="inline">
                  Більше експертів
                </Typography>
                <ArrowForwardIosIcon />
              </Box>
            </Grid>
            <BorderBottom />
            <Grid item xs={12} className={classes.containerMaterials}>
              <MaterialsContainer direction={currentDirection} />
            </Grid>
            <Grid item xs={12} className={classes.containerCourses}>
              <Typography variant="h5" className={classes.courseTitle}>
                Рекомендовані курси
              </Typography>
              <Carousel>
                {courses.map((p) => (
                  <div key={p.title}>
                    <CourseCard course={p} />
                  </div>
                ))}
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
