import React from 'react';
import { IPostPreviewCardProps } from './types';
import { MediaPostPreviewCard } from './MediaPostPreviewCard/MediaPostPreviewCard';
import { TranslationPostPreviewCard } from './TranslationPostPreviewCard/TranslationPostPreviewCard';
import { ExpertOpinionPostPreviewCard } from './ExpertOpinionPostPreviewCard/ExpertOpinionPostPreviewCard';
import { VideoPostPreviewCard } from './VideoPostPreviewCard/VideoPostPreviewCard';

export const PostPreviewCard: React.FC<IPostPreviewCardProps> = ({
  post,
  shouldNotUseLink,
  resetPage,
}) => {
  switch (true) {
    case post.type && post.type.id === 2:
      return (
        <VideoPostPreviewCard post={post} shouldNotUseLink={shouldNotUseLink} />
      );
    case post.origins && post.origins[0] && post.origins[0].id === 2:
      return (
        <MediaPostPreviewCard post={post} shouldNotUseLink={shouldNotUseLink} />
      );
    case post.origins && post.origins[0] && post.origins[0].id === 3:
      return (
        <TranslationPostPreviewCard
          post={post}
          shouldNotUseLink={shouldNotUseLink}
          resetPage={resetPage}
        />
      );
    case post.origins && post.origins[0] && post.origins[0].id === 1:
      return (
        <ExpertOpinionPostPreviewCard
          post={post}
          shouldNotUseLink={shouldNotUseLink}
        />
      );
    default:
      return (
        <ExpertOpinionPostPreviewCard
          post={post}
          shouldNotUseLink={shouldNotUseLink}
        />
      );
  }
};
