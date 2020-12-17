import React, { useEffect, useRef } from 'react';
import {
  makeStyles,
  createStyles,
  Button,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import BorderBottom from '../../../lib/components/Border';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import PostsList from '../../../lib/components/PostsList';
import {
  fetchExpertPosts,
  fetchInitialMaterials,
  setupExpertMaterialsID,
} from '../store/expertsSlice';
import { RootStateType } from '../../../store/rootReducer';
import { LoadingStatusEnum } from '../../../lib/types';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'ExpertMaterialsContainer',
});

export interface IExpertMaterialsContainerProps {
  id: string;
}

const ExpertMaterialsContainer: React.FC<IExpertMaterialsContainerProps> = ({
  id,
}) => {
  const dispatch = useDispatch();
  const setMaterials = () => dispatch(fetchExpertPosts(Number(id)));
  const setMaterialsInitial = () => dispatch(fetchInitialMaterials(Number(id)));

  dispatch(setupExpertMaterialsID(id));

  const {
    loadedPosts,
    meta: { loading, isLastPage, pageNumber },
  } = useSelector((state: RootStateType) => {
    return state.experts.materials[id];
  });

  useEffect(() => {
    setMaterialsInitial();
  }, []);

  const classes = useStyles();

  const gridRef = useRef<HTMLDivElement>(null);

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
            setMaterials();
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
      <Container>
        <Typography variant="h4">Матеріали</Typography>
        <Grid container spacing={2} direction="row" alignItems="center">
          <PostsList postsList={loadedPosts} />
        </Grid>
        <Grid container direction="column" alignItems="center">
          <LoadingInfo loading={loading} />
        </Grid>

        <Grid
          container
          direction="column"
          alignItems="center"
          //   className={classes.showMore}
          ref={gridRef}
        >
          {renderLoadControls()}
        </Grid>
        <BorderBottom />
      </Container>
    </>
  );
};

export default ExpertMaterialsContainer;
