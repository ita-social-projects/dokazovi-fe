import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { RootStateType } from '../../../store/rootReducer';
import { fetchNewestPosts, IMainState } from '../store/mainSlice';
import { useStyles } from './styles/NewestContainer.style';
import BorderBottom from '../../../lib/components/Border';
import PostsList from '../../../lib/components/PostsList';

const NewestContainer: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const setNewest = () => dispatch(fetchNewestPosts());

  const {
    newestPosts,
    loading,
    meta: { isLastPage },
  } = useSelector<RootStateType, IMainState['newest']>((state) => {
    return state.main.newest;
  });

  useEffect(() => {
    setNewest();
  }, []);

  const renderLoading = () => {
    return loading === 'pending' ? <CircularProgress /> : null;
  };

  const renderError = (errorMsg: string) => {
    return loading === 'failed' ? <span>{errorMsg}</span> : null;
  };

  const renderLoadControls = (): JSX.Element => {
    let control: JSX.Element = <></>;

    if (loading !== 'pending') {
      control = (
        <Button variant="contained" onClick={setNewest}>
          Більше матеріалів
        </Button>
      );
    }

    if (isLastPage) {
      control = <span>Нових матеріалів немає</span>;
    }

    return control;
  };

  return (
    <>
      <Container>
        <Typography variant="h4">Найновіше</Typography>
        <Grid container spacing={2} direction="row" alignItems="center">
          <PostsList postsList={newestPosts} />
        </Grid>
        <Grid container direction="column" alignItems="center">
          {renderLoading()}
          {renderError('Failed to load Newest Posts.')}
        </Grid>

        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.showMore}
        >
          {renderLoadControls()}
        </Grid>
        <BorderBottom />
      </Container>
    </>
  );
};

export default NewestContainer;
