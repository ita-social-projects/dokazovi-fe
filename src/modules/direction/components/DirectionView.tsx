import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box, Link } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useStyles } from './styles/DirectionView.styles';
import BorderBottom from '../../../lib/components/Border';
import { RootStateType } from '../../../store/rootReducer';
import { fetchExperts, setupDirection } from '../store/directionSlice';
import { ExpertsViewCard } from '../../../lib/components/ExpertsViewCard';
import { IDirection } from '../../../lib/types';
import MaterialsContainer from './MaterialsContainer';
import PageTitleComponent from '../../../lib/components/PageTitleComponent';
import { selectExpertsByIds } from '../../../store/selectors';

const DirectionView: React.FC = () => {
  const { name: directionName } = useParams<{ name: string }>();
  const directions = useSelector(
    (state: RootStateType) => state.properties.directions,
  );
  const directionData = directions.find(
    (direction) => direction.name === directionName,
  ) as IDirection; // TODO: validate route!

  const dispatch = useDispatch();

  dispatch(setupDirection(directionName));

  useEffect(() => {
    if (directionData) {
      dispatch(fetchExperts(directionData.name, directionData.id?.toString()));
    }
  }, [directionData, dispatch]);

  const {
    experts: {
      expertIds,
      meta: { loading },
    },
  } = useSelector((state: RootStateType) => state.directions[directionName]);
  const experts = selectExpertsByIds(expertIds);

  const classes = useStyles();

  return (
    <>
      <PageTitleComponent title={directionData?.label} />
      {directionData ? (
        <Container>
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} className={classes.header}>
              <Box
                color="disabled"
                className={classes.icon}
                style={{ backgroundColor: directionData?.color }}
              />
              <Typography variant="h2">{directionData?.label}</Typography>
            </Grid>
            <BorderBottom />
            <Grid item xs={12}>
              <ExpertsViewCard
                cards={experts}
                loading={loading}
                isOnDirection
              />
              <Box className={classes.moreExperts}>
                <Typography variant="h5" align="right" display="inline">
                  <Link href="/experts">
                    Більше експертів
                    <ArrowForwardIosIcon />
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <BorderBottom />
            <Grid item xs={12} className={classes.containerMaterials}>
              <MaterialsContainer direction={directionData} />
            </Grid>
          </Grid>
        </Container>
      ) : (
        directions.length && (
          <>
            <Typography variant="h3">Direction not found</Typography>
          </>
        )
      )}
    </>
  );
};

export default DirectionView;
