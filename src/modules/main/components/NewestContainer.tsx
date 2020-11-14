import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper, Grid, Button } from '@material-ui/core';
import { IMainState } from '../store/mainReducer';
import { IAppState } from '../../../store/rootReducer';
import { generatedMockData } from './constants/newestPostsMock-data';
import { loadNewest } from '../store/actions';
import {
  NUMBER_OF_POSTS,
  LOAD_POSTS_LIMIT,
} from './constants/newestPostsPagination-config';

const NewestContainer: React.FC = () => {
  const [showMore, setShowMore] = useState(true);
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const setNewest = (posts) => dispatch(loadNewest(posts));

  const newestPosts = useSelector<IAppState, IMainState['newest']>((state) => {
    return state.main.newest;
  });

  useEffect(() => {
    loadMorePost();
  }, []);

  const loadMorePost = () => {
    const newIndex = index + LOAD_POSTS_LIMIT;
    const newShowMore = newIndex < NUMBER_OF_POSTS - 1;
    const newList = [...generatedMockData.slice(index, newIndex)];
    setIndex(newIndex);
    setNewest(newList);
    setShowMore(newShowMore);
  };

  return (
    <>
      <Container>
        <h2>Найновіше</h2>
        <Grid container spacing={2} direction="row" alignItems="center">
          {newestPosts.map((post) => (
            <Grid key={post.author?.phone} item xs={12} lg={4} md={6}>
              <Paper>
                <img src={post.author?.photo} alt="" />
                <br />
                <span>{post.title}</span>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {showMore ? (
          <Button variant="contained" onClick={loadMorePost}>
            Більше матеріалів
          </Button>
        ) : (
          <span>Більше нових матеріалів немає</span>
        )}
      </Container>
    </>
  );
};

export default NewestContainer;
