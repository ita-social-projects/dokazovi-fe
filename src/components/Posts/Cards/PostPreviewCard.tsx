import React from 'react';
import { IPostPreviewCardProps } from './types';
import { MediaPostPreviewCard } from './MediaPostPreviewCard/MediaPostPreviewCard';
import { TranslationPostPreviewCard } from './TranslationPostPreviewCard/TranslationPostPreviewCard';
import { ExpertOpinionPostPreviewCard } from './ExpertOpinionPostPreviewCard/ExpertOpinionPostPreviewCard';
import { VideoPostPreviewCard } from './VideoPostPreviewCard/VideoPostPreviewCard';

export const PostPreviewCard: React.FC<IPostPreviewCardProps> = ({
  post,
  shouldNotUseLink,
}) => {
  switch (true) {
    case post.type && post.type.id === 2:
      return (
        <VideoPostPreviewCard post={post} shouldNotUseLink={shouldNotUseLink} />
      );
    case post.origins && post.origins[0].id === 1:
      return (
        <MediaPostPreviewCard post={post} shouldNotUseLink={shouldNotUseLink} />
      );
    case post.origins && post.origins[0].id === 2:
      return (
        <TranslationPostPreviewCard
          post={post}
          shouldNotUseLink={shouldNotUseLink}
        />
      );
    case post.origins && post.origins[0].id === 3:
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
