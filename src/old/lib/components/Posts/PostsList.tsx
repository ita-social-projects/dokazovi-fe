import React, { useRef } from 'react';
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
  resetPage?: () => void;
  mobile?: boolean;
}

export const PostsList: React.FC<IPostsListProps> = ({
  postsList,
  resetPage,
  mobile,
}) => {
  const classes = useStyles();
  const postIdxForScroll = postsList.length - LOAD_POSTS_LIMIT;
  const postForScrollRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  return postsList.length === 0 ? (
    <Notification message={t(langTokens.common.noInfo)} />
  ) : (
    <Masonry
      breakpointCols={mobile ? 1 : MASONRY_BREAKPOINTS}
      className={classes.masonryGrid}
      columnClassName={classes.masonryColumn}
    >
      {postsList.map((post, idx) => (
        <div
          key={post.id}
          className={classes.masonryItem}
          ref={postIdxForScroll === idx ? postForScrollRef : null}
        >
          <PostPreviewCard post={post} resetPage={resetPage} />
        </div>
      ))}
    </Masonry>
  );
};
