import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import PostsGridView from '../../../lib/components/PostsList';
import {
  fetchMaterials,
  setMaterialsLoadingStatus,
} from '../store/directionSlice';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from './styles/MaterialsContainer.styles';
import { IDirection } from '../../../lib/types';

interface IMaterialsContainerProps {
  direction: IDirection;
}

const MaterialsContainer: React.FC<IMaterialsContainerProps> = ({
  direction,
}) => {
  const classes = useStyles();

  const { posts, meta }  = useSelector(
    (state: RootStateType) => state.directions[direction.name].materials,
  );

  const dispatch = useDispatch();

  const dispatchFetchAction = () => {
    dispatch(setMaterialsLoadingStatus(direction));
    dispatch(fetchMaterials(direction));
  };

  useEffect(() => {
    dispatchFetchAction();
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (meta.pageNumber > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [meta.pageNumber]);

  return (
    <Container>
      <Typography variant="h4">Матеріали</Typography>
      <Grid container spacing={2} direction="row" alignItems="center">
        <PostsGridView postsList={posts} />
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.showMore}
        ref={gridRef}
      >
        {meta.isLoading && <CircularProgress />}
        {!meta.isLoading && !meta.isLastPage && (
          <Button variant="contained" onClick={dispatchFetchAction}>
            Більше матеріалів
          </Button>
        )}
        {meta.isLastPage && <span>Більше нових матеріалів немає</span>}
      </Grid>
    </Container>
  );
};

export default MaterialsContainer;
