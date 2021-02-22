import { Box } from '@material-ui/core';
import React from 'react';
import Masonry from 'react-masonry-css';
import { useStyles, masonryBreakpoints } from '../styles/PostsList.styles';
import { IPost } from '../types';
import PostPreviewCard from './PostPreview/PostPreviewCard';

export interface IPostsListProps {
  postsList: IPost[];
}

const PostsList: React.FC<IPostsListProps> = (props) => {
  const classes = useStyles();
  const { postsList } = props;

  return (
    <Masonry
      breakpointCols={masonryBreakpoints}
      className={classes.masonryGrid}
      columnClassName={classes.masonryColumn}
    >
      {postsList.map((post) => (
        <Box key={post.id} className={classes.masonryItem}>
          <PostPreviewCard data={post} />
        </Box>
      ))}
    </Masonry>
  );
};

export default PostsList;
