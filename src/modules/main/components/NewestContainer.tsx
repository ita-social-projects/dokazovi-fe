import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button } from '@material-ui/core';
import { IMainState } from '../store/mainReducer';
import { RootState } from '../../../store/rootReducer';
import { fetchNewestPosts } from '../store/mainSlice';
import PostPreviewCard from '../../../lib/components/PostPreview/PostPreviewCard';

const NewestContainer: React.FC = () => {
  const dispatch = useDispatch();
  const setNewest = () => dispatch(fetchNewestPosts());

  const { newestPosts, meta } = useSelector<RootState, IMainState['newest']>(
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
        <h2>Найновіше</h2>
        <Grid container spacing={2} direction="row" alignItems="center">
          {newestPosts.map((post) => (
            <Grid item xs={12} lg={4} md={6} key={post.author?.phone}>
              <PostPreviewCard data={post} />
            </Grid>
          ))}
        </Grid>

        {meta.showMore ? (
          <Button variant="contained" onClick={setNewest}>
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
