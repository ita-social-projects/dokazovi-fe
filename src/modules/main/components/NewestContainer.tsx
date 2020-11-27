import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { RootStateType } from '../../../store/rootReducer';
import { fetchNewestPosts, IMainState } from '../store/mainSlice';
import { useStyles } from './styles/NewestContainer.style';
import BorderBottom from '../../../lib/components/Border';
import PostsGridView from '../../../lib/components/PostsGridView';

const NewestContainer: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const setNewest = () => dispatch(fetchNewestPosts());

  const { newestPosts, meta } = useSelector<RootStateType, IMainState['newest']>(
    (state) => {
      return state.main.newest;
    },
  );

  useEffect(() => {
    setNewest();
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h4">Найновіше</Typography>
        <PostsGridView posts={newestPosts}/>
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.showMore}
        >
          {meta.showMore ? (
            <Button variant="contained" onClick={setNewest}>
              Більше матеріалів
            </Button>
          ) : (
            <span>Більше нових матеріалів немає</span>
          )}
        </Grid>
        <BorderBottom />
      </Container>
    </>
  );
};

export default NewestContainer;
