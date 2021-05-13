import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from './NewestPostsList.styles';
import {
  IPost,
  LoadingStatusEnum,
  LoadingStatusType,
  PostsPreviewCardStylesEnum,
  PostsPreviewCardStylesType,
} from '../../../old/lib/types';
import { PostPreviewCard } from '../../../components/Posts/Cards/PostPreviewCard';
import LoadingContainer from '../../../old/lib/components/Loading/LoadingContainer';
import { getPosts } from '../../../old/lib/utilities/API/api';
import { RequestParamsType } from '../../../old/lib/utilities/API/types';
import { MediaPostPreviewCard } from '../../../components/Posts/Cards/MediaPostPreviewCard/MediaPostPreviewCard';
import { VideoPostPreviewCard } from '../../../components/Posts/Cards/VideoPostPreviewCard/VideoPostPreviewCard';
import { TranslationPostPreviewCard } from '../../../components/Posts/Cards/TranslationPostPreviewCard/TranslationPostPreviewCard';
import { ExpertOpinionPostPreviewCard } from '../../../components/Posts/Cards/ExpertOpinionPostPreviewCard/ExpertOpinionPostPreviewCard';

export interface IPostsListProps {
  postsListTypeName: string;
  postsPreviewCardStylesType?: PostsPreviewCardStylesType;
}

export const NewestPostsList: React.FC<IPostsListProps> = ({
  postsListTypeName,
  postsPreviewCardStylesType,
}) => {
  const [postsList, setPostsList] = useState<IPost[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
    LoadingStatusEnum.pending,
  );

  const classes = useStyles();

  const getParams = () => {
    const params: RequestParamsType = {
      size: 4,
    };

    switch (postsPreviewCardStylesType) {
      case PostsPreviewCardStylesEnum.EXPERT_OPINION:
        params.origins = [3];
        break;
      case PostsPreviewCardStylesEnum.MEDIA:
        params.origins = [1];
        break;
      case PostsPreviewCardStylesEnum.TRANSLATION:
        params.origins = [2];
        break;
      case PostsPreviewCardStylesEnum.VIDEO:
        params.types = [2];
        break;
      default:
        break;
    }
    return params;
  };

  useEffect(() => {
    // setLoadingStatus(LoadingStatusEnum.pending);
    getPosts('all-posts', { params: getParams() })
      .then((res) => {
        setPostsList(res.data.content);
        setLoadingStatus(LoadingStatusEnum.succeeded);
      })
      .catch((err) => {});
  }, []);

  // const displayPostPreviewCards = () => {
  //   return postsList.map(post => (<div key={post.id}>
  //     <PostPreviewCard key={post.id} post={post}/>
  //   </div>));
  // };

  const displayPostPreviewCards = (type: PostsPreviewCardStylesType) => {
    switch (type) {
      case PostsPreviewCardStylesEnum.VIDEO:
        return postsList.map((post) => (
          <div key={post.id}>
            <VideoPostPreviewCard post={post} />
          </div>
        ));
      case PostsPreviewCardStylesEnum.MEDIA:
        return postsList.map((post) => (
          <div key={post.id}>
            <MediaPostPreviewCard post={post} />
          </div>
        ));
      case PostsPreviewCardStylesEnum.TRANSLATION:
        return postsList.map((post) => (
          <div key={post.id}>
            <TranslationPostPreviewCard post={post} />
          </div>
        ));
      case PostsPreviewCardStylesEnum.EXPERT_OPINION:
        return postsList.map((post) => (
          <div key={post.id}>
            <ExpertOpinionPostPreviewCard post={post} />
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <>
      <div className={classes.header}>
        <Typography className={classes.postsType} variant="h5" component="span">
          {postsListTypeName}
        </Typography>
        <div className={classes.line} />
        <div className={classes.arrow}>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <Grid container className={classes.grid}>
        {loadingStatus === LoadingStatusEnum.succeeded ? (
          // ? displayPostPreviewCards()
          displayPostPreviewCards(
            postsPreviewCardStylesType as PostsPreviewCardStylesType,
          )
        ) : (
          <LoadingContainer loading={loadingStatus} />
        )}
      </Grid>
    </>
  );
};
