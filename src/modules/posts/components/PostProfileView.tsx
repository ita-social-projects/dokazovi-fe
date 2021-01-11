/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import BorderBottom from '../../../lib/components/Border';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import { RootStateType } from '../../../store/rootReducer';
import { fetchPostById } from '../store/postsSlice';
import PostInfo from './PostInfo';
import { useStyles } from '../styles/PostProfileView.styles';

const PostProfileView: React.FC = () => {
  const classes = useStyles();
  const { postId } = useParams<{ postId: string }>();
  const {
    posts,
    meta: { loading },
  } = useSelector((state: RootStateType) => state.posts.posts);
  const dispatch = useDispatch();

  const selectedPost = posts.find((e) => e.id === Number(postId));

  useEffect(() => {
    dispatch(fetchPostById(Number(postId)));
  }, []);

  return (
    <Container>
      <Container className={classes.container}>
        PostProfileView
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.loading}
        >
          <LoadingInfo loading={loading} />
        </Grid>
        {selectedPost && <PostInfo post={selectedPost} />}
        <BorderBottom />
      </Container>
    </Container>
  );
};

export default PostProfileView;
