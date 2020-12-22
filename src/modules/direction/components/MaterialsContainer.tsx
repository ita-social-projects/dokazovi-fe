import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import PostList from '../../../lib/components/PostsList';
import {
  fetchInitialMaterials,
  fetchMaterials,
} from '../store/directionSlice';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from './styles/MaterialsContainer.styles';
import { IDirection, LoadingStatusEnum } from '../../../lib/types';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';

interface IMaterialsContainerProps {
  direction: IDirection;
}

const MaterialsContainer: React.FC<IMaterialsContainerProps> = ({
  direction,
}) => {
  const classes = useStyles();

  const {
    posts,
    meta: { loading, isLastPage, pageNumber },
    filters,
  } = useSelector(
    (state: RootStateType) => state.directions[direction.name].materials,
  );

  const dispatch = useDispatch();

const dispatchFetchAction = () => dispatch(fetchMaterials(direction));

  useEffect(() => {
    dispatch(fetchInitialMaterials(direction));
  }, [filters]);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffectExceptOnMount(() => {
    if (pageNumber > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageNumber]);

  return (
    <Container>
      <Typography variant="h4">Матеріали</Typography>
      <Grid container spacing={2} direction="row" alignItems="center">
        <PostList postsList={posts} />
      </Grid>
      <Grid container direction="column" alignItems="center">
        <LoadingInfo loading={loading} />
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.showMore}
        ref={gridRef}
      >
        {loading !== LoadingStatusEnum.pending && !isLastPage && (
          <Button variant="contained" onClick={dispatchFetchAction}>
            Більше матеріалів
          </Button>
        )}
        {isLastPage && <span>Більше нових матеріалів немає</span>}
      </Grid>
    </Container>
  );
};

export default MaterialsContainer;
