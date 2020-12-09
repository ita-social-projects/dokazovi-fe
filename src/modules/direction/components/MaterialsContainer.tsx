import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import PostList from '../../../lib/components/PostsList';
import { fetchMaterials, setMaterialsLoadingStatus } from '../store/directionSlice';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from './styles/MaterialsContainer.styles';
import { IDirection, LoadingStatusEnum } from '../../../lib/types';
import LoadingInfo from '../../../lib/components/LoadingInfo';

interface IMaterialsContainerProps {
  direction: IDirection;
}

const MaterialsContainer: React.FC<IMaterialsContainerProps> = ({
  direction,
}) => {
  const classes = useStyles();

  const { posts, meta: { loading, isLastPage, pageNumber } }  = useSelector(
    (state: RootStateType) => state.directions[direction.name].materials,
  );

  const dispatch = useDispatch();

  const dispatchFetchAction = () => {
    dispatch(setMaterialsLoadingStatus({
      direction, 
      status: LoadingStatusEnum.pending 
    }));
    dispatch(fetchMaterials(direction));
  };

  useEffect(() => {
    dispatchFetchAction();
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
