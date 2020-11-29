import React from 'react';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useStyles } from './styles/DirectionView.styles';
import { DIRECTION_PROPERTIES } from '../../../lib/constants/direction-properties';
import BorderBottom from '../../../lib/components/Border';
import DirectionCourses from './directionCourses/DirectionCourses';

export interface IDirectionViewProps {}

const DirectionView: React.FC<IDirectionViewProps> = () => {
  const { pathname } = useLocation();
  const directions = Object.values(DIRECTION_PROPERTIES);
  const currentDirection = directions.find(
    (value) => value.route === pathname.split('/')[2],
  );
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
            {/* <ExpertsView /> */}
          </Grid>
          <Grid item xs={12}>
            {/* <MaterialsView /> */}
          </Grid>
          <Grid item xs={12}>
            <DirectionCourses/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DirectionView;
