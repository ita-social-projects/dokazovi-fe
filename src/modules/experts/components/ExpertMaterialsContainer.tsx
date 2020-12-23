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
} from '../store/expertsSlice';
import { RootStateType } from '../../../store/rootReducer';
import { LoadingStatusEnum } from '../../../lib/types';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import { useStyles } from '../styles/ExpertProfileView.styles';

export interface IExpertMaterialsContainerProps {
  id: string;
}

const ExpertMaterialsContainer: React.FC<IExpertMaterialsContainerProps> = ({
  id,
}) => {
  const dispatch = useDispatch();
  const dispatchFetchMaterialsAction = () =>
    dispatch(fetchExpertMaterials(Number(id)));
  const dispatchFetchInitialMaterialsAction = () =>
    dispatch(fetchInitialMaterials(Number(id)));

  dispatch(setupExpertMaterialsID(id));

  const {
    loadedPosts,
    meta: { loading, isLastPage, pageNumber },
    filters,
  } = useSelector((state: RootStateType) => state.experts.materials[id]);

  useEffect(() => {
    dispatchFetchInitialMaterialsAction();
  }, [filters]);

  const gridRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffectExceptOnMount(() => {
    if (pageNumber > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageNumber]);

  const renderLoadControls = (
    lastPageMsg = 'Більше нових матеріалів немає',
  ): JSX.Element => {
    let control: JSX.Element = <></>;

    if (loading === LoadingStatusEnum.succeeded) {
      control = (
        <Button
          variant="contained"
          onClick={() => {
            dispatchFetchMaterialsAction();
          }}
        >
          Більше матеріалів
        </Button>
      );
    }

    if (isLastPage) {
      control = <span>{lastPageMsg}</span>;
    }

    return control;
  };
  return (
    <>
      <Container className={classes.container}>
        <Typography variant="h4">Матеріали</Typography>
        <Grid container spacing={2} direction="row" alignItems="center">
          <PostsList postsList={loadedPosts} />
        </Grid>
        <Grid container direction="column" alignItems="center" className={classes.loading}>
          <LoadingInfo loading={loading} />
        </Grid>

        <Grid container direction="column" alignItems="center" ref={gridRef}>
          {renderLoadControls()}
        </Grid>
        <BorderBottom />
      </Container>
    </>
  );
};

export default ExpertMaterialsContainer;
