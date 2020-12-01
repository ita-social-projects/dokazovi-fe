import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import PostsGridView from '../../../lib/components/PostsGridView';
import {
  fetchMaterials,
  setMaterialsLoadingStatus,
  IDirectionState,
} from '../store/directionSlice';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from './styles/MaterialsContainer.styles';

interface IMaterialsContainerProps {
  directionID: number;
}

const MaterialsContainer: React.FC<IMaterialsContainerProps> = ({
  directionID,
}) => {
  const classes = useStyles();

  const { posts, meta } = useSelector<
    RootStateType,
    IDirectionState['materials']
  >((state) => state.direction.materials);

  const dispatch = useDispatch();

  const dispatchFetchAction = () => {
    dispatch(setMaterialsLoadingStatus());
    dispatch(fetchMaterials(directionID));
  };

  useEffect(() => {
    dispatchFetchAction();
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [meta.pageNumber]);

  return (
    <Container>
      <Typography variant="h4">Матеріали</Typography>
      <PostsGridView posts={posts} />
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.showMore}
        ref={gridRef}
      >
        {meta.isLoading && <CircularProgress />}
        {!meta.isLoading && !meta.last && (
          <Button variant="contained" onClick={dispatchFetchAction}>
            Більше матеріалів
          </Button>
        )}
        {meta.last && <span>Більше нових матеріалів немає</span>}
      </Grid>
    </Container>
  );
};

export default MaterialsContainer;
