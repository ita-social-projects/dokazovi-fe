import React from 'react';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import { useLocation } from 'react-router-dom';
import { useStyles } from './styles/DirectionView.styles';
import { DIRECTION_PROPERTIES } from '../../../lib/components/PostPreview/direction-properties';

export interface IDirectionViewProps {}

const DirectionView: React.FC<IDirectionViewProps> = () => {
  const location = useLocation();
  console.log(location);
  const { color, cyrillic } = DIRECTION_PROPERTIES.COVID19;
  const classes = useStyles();
  return (
    <>
      <Container>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} className={classes.header}>
            <Box
              color="disabled"
              className={classes.icon}
              style={{ backgroundColor: color }}
            />
            <Typography variant="h2">{cyrillic}</Typography>
          </Grid>
          <Grid item xs={12}>
            {/* <ExpertsView /> */}
          </Grid>
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
