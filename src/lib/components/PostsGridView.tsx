import React from 'react';
import { Grid } from '@material-ui/core';
import { IPost } from '../types';
import PostPreviewCard from './PostPreview/PostPreviewCard';

type PostsGridViewPropsType = {
  posts: IPost[],
};

const PostsGridView: React.FC<PostsGridViewPropsType> = ({ posts }) => {
  return (
    <Grid container spacing={2} direction="row" alignItems="center">
      {posts.map((post) => (
        <Grid item xs={12} lg={4} md={6} key={post.author?.id}>
          <PostPreviewCard data={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsGridView;
