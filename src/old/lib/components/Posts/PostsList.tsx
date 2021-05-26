import React, { forwardRef } from 'react';
import Masonry from 'react-masonry-css';
import { useStyles, MASONRY_BREAKPOINTS } from '../../styles/PostsList.styles';
import { IPost } from '../../types';
import { PostPreviewCard } from '../../../../components/Posts/Cards/PostPreviewCard';
import { LOAD_POSTS_LIMIT } from '../../constants/posts';

export interface IPostsListProps {
  postsList: IPost[];
}

// eslint-disable-next-line react/display-name
export const PostsList = forwardRef<HTMLDivElement, IPostsListProps>(
  ({ postsList }, nodeToScrollToRef) => {
    const classes = useStyles();
    const postToScrollIntoViewIdx = postsList.length - LOAD_POSTS_LIMIT;

    return (
      <Masonry
        breakpointCols={MASONRY_BREAKPOINTS}
        className={classes.masonryGrid}
        columnClassName={classes.masonryColumn}
      >
        {postsList.map((post, idx) => (
          <div
            key={post.id}
            className={classes.masonryItem}
            ref={postToScrollIntoViewIdx === idx ? nodeToScrollToRef : null}
          >
            <PostPreviewCard post={post} />
          </div>
        ))}
      </Masonry>
    );
  },
);
