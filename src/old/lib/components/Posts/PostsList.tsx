import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useTranslation } from 'react-i18next';
import { useStyles, MASONRY_BREAKPOINTS } from '../../styles/PostsList.styles';
import { IPost } from '../../types';
import { PostPreviewCard } from '../../../../components/Posts/Cards/PostPreviewCard';
import { LOAD_POSTS_LIMIT } from '../../constants/posts';
import { Notification } from '../../../../components/Notifications/Notification';
import { langTokens } from '../../../../locales/localizationInit';

export interface IPostsListProps {
  postsList: IPost[];
}

export const PostsList: React.FC<IPostsListProps> = ({ postsList }) => {
  const classes = useStyles();
  const postIdxForScroll = postsList.length - LOAD_POSTS_LIMIT;
  const postForScrollRef = useRef<HTMLDivElement>(null);

  const [prevPostsCount, setPrevPostsLength] = useState(postsList.length);

  const { t } = useTranslation();

  useEffect(() => {
    if (!postForScrollRef.current) return;
    if (
      postsList.length > LOAD_POSTS_LIMIT &&
      postsList.length !== prevPostsCount
    ) {
      postForScrollRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }

    setPrevPostsLength(postsList.length);
  }, [postsList.length]);

  return postsList.length === 0 ? (<Notification message={t(langTokens.common.noInfo)} />) : (
    <Masonry
      breakpointCols={MASONRY_BREAKPOINTS}
      className={classes.masonryGrid}
      columnClassName={classes.masonryColumn}
    >
      {postsList.map((post, idx) => (
        <div
          key={post.id}
          className={classes.masonryItem}
          ref={postIdxForScroll === idx ? postForScrollRef : null}
        >
          <PostPreviewCard post={post} />
        </div>
      ))}
    </Masonry>
  );
};
