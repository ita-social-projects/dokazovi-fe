import { Grid } from '@material-ui/core';
import React from 'react';
import { IPost } from '../types';
import PostPreviewCard from './PostPreview/PostPreviewCard';

export interface IPostsListProps {
  postsList: IPost[];
}

const PostsList: React.FC<IPostsListProps> = (props) => {
  const { postsList } = props;

  return (
    <>
      {postsList.map((post) => (
        <Grid item xs={12} lg={4} md={6} key={post.id}>
          <PostPreviewCard data={post} />
        </Grid>
      ))}
    </>
  );
};

export default PostsList;
