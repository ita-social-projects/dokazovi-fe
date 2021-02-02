import React, { useEffect, useRef } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import BorderBottom from '../../../lib/components/Border';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import PostsList from '../../../lib/components/PostsList';
import {
  fetchExpertMaterials,
  fetchInitialMaterials,
  setupExpertMaterialsID,
  setMaterialsTypes,
} from '../store/expertsSlice';
import { RootStateType } from '../../../store/rootReducer';
import { LoadingStatusEnum } from '../../../lib/types';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import { useStyles } from '../styles/ExpertProfileView.styles';
import { PostTypeFilter } from '../../direction/components/PostTypesFilter';
import { selectPostsByIds } from '../../../store/selectors';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';

export interface IExpertMaterialsContainerProps {
  expertId: string;
}

const ExpertMaterialsContainer: React.FC<IExpertMaterialsContainerProps> = ({
  expertId,
}) => {
  const dispatch = useDispatch();
  const dispatchFetchMaterialsAction = () =>
    dispatch(fetchExpertMaterials(Number(expertId)));
  const dispatchFetchInitialMaterialsAction = () =>
    dispatch(fetchInitialMaterials(Number(expertId)));

  dispatch(setupExpertMaterialsID(expertId));

  const {
    postIds,
    meta: { loading, isLastPage, pageNumber },
    filters,
  } = useSelector((state: RootStateType) => state.experts.materials[expertId]);
  const materials = selectPostsByIds(postIds);

  useEffect(() => {
    dispatchFetchInitialMaterialsAction();
  }, [filters]);

  useEffect(() => {
    return () => {
      dispatch(
        setMaterialsTypes({
          types: { value: undefined },
          expertId,
        }),
      );
    };
  }, []);

  const setFilters = (checked: string[]) => {
    dispatch(
      setMaterialsTypes({
        types: { value: checked },
        expertId,
      }),
    );
  };

  const gridRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffectExceptOnMount(() => {
    if (pageNumber > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageNumber]);

  return (
    <>
      <Container className={classes.container}>
        <Typography variant="h4">Матеріали</Typography>
        <PostTypeFilter dispatchFunction={setFilters} />
        <Grid container spacing={2} direction="row" alignItems="center">
          <PostsList postsList={materials} />
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.loading}
        >
          <LoadingInfo loading={loading} />
        </Grid>

        <Grid container direction="column" alignItems="center" ref={gridRef}>
          <LoadMorePostsButton
            clicked={dispatchFetchMaterialsAction}
            isLastPage={isLastPage}
            loading={loading}
          />
        </Grid>
        <BorderBottom />
      </Container>
    </>
  );
};

export default ExpertMaterialsContainer;
