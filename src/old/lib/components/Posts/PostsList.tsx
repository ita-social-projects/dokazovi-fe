import { Box } from '@material-ui/core';
import React from 'react';
import Masonry from 'react-masonry-css';
import { useStyles, MASONRY_BREAKPOINTS } from '../../styles/PostsList.styles';
import { IPost } from '../../types';
import { PostPreviewCard } from '../../../../components/Posts/Cards/PostPreviewCard';

export interface IPostsListProps {
  postsList: IPost[];
}

export const PostsList: React.FC<IPostsListProps> = ({ postsList }) => {
  const classes = useStyles();

  return (
    <Masonry
      breakpointCols={MASONRY_BREAKPOINTS}
      className={classes.masonryGrid}
      columnClassName={classes.masonryColumn}
    >
      {postsList.map((post) => (
        <Box key={post.id} className={classes.masonryItem}>
          <PostPreviewCard post={post} />
        </Box>
      ))}
    </Masonry>
  );
};
