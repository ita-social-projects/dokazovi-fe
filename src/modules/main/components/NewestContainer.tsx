import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { RootStateType } from '../../../store/rootReducer';
import {
  fetchNewestPosts,
  IMainState,
  fetchInitialNewestPosts,
} from '../store/mainSlice';
import { useStyles, styles } from './styles/NewestContainer.style';
import BorderBottom from '../../../lib/components/Border';
import PostsList from '../../../lib/components/PostsList';
import { LoadingStatusEnum } from '../../../lib/types';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';

const NewestContainer: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const setNewest = () => dispatch(fetchNewestPosts());
  const setNewestInitial = () => dispatch(fetchInitialNewestPosts());

  const {
    newestPosts,
    meta: { isLastPage, loading, currentPage },
  } = useSelector<RootStateType, IMainState['newest']>((state) => {
    return state.main.newest;
  });

  useEffect(() => {
    setNewestInitial();
  }, []);

  const renderLoadControls = (
    lastPageMsg = 'Більше нових матеріалів немає',
  ): JSX.Element => {
    let control: JSX.Element = <></>;

    if (loading !== LoadingStatusEnum.pending) {
      control = (
        <Button
          variant="contained"
          onClick={() => {
            setNewest();
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

  const gridRef = useRef<HTMLDivElement>(null);

  useEffectExceptOnMount(() => {
    if (currentPage > 1) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div style={styles.container}>
      {loading === LoadingStatusEnum.pending && currentPage < 1 ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={styles.loading}
        >
          <LoadingInfo loading={loading} />
        </Grid>
      ) : (
        <Container>
          <Typography variant="h4">Найновіше</Typography>
          <Grid container spacing={2} direction="row" alignItems="center">
            <PostsList postsList={newestPosts} />
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
            {renderLoadControls()}
          </Grid>
          <BorderBottom />
        </Container>
      )}
    </div>
  );
};

export default NewestContainer;
