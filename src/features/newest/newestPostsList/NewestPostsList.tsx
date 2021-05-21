import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import _ from 'lodash';
import { useStyles } from './NewestPostsList.styles';
import {
  IPost,
  LoadingStatusEnum,
  LoadingStatusType,
} from '../../../old/lib/types';
import { PostPreviewCard } from '../../../components/Posts/Cards/PostPreviewCard';
import { SkeletonPostPreviewCard } from '../../../components/Posts/Cards/SkeletonPostPreviewCard/SkeletonPostPreviewCard';

export interface INewestPostsListProps {
  postsListTitle: string;
  postsListPath: string;
  postsList?: IPost[];
  loadingStatus: LoadingStatusType;
}

export const NewestPostsList: React.FC<INewestPostsListProps> = ({
  postsListTitle,
  postsListPath,
  postsList,
  loadingStatus,
}) => {
  const classes = useStyles();

  const displayPostPreviewCards = () => {
    return (
      postsList &&
      postsList.map((post) => (
        <div key={post.id}>
          <PostPreviewCard key={post.id} post={post} />
        </div>
      ))
    );
  };

  const displaySkeletons = () =>
    new Array(4).fill(null).map(() => (
      <div key={_.uniqueId()}>
        <SkeletonPostPreviewCard />
      </div>
    ));

  return (
    <>
      <Link to={postsListPath}>
        <div className={classes.header}>
          <Typography
            className={classes.postsType}
            variant="h5"
            component="span"
          >
            {postsListTitle}
          </Typography>
          <div className={classes.line} />
          <div className={classes.arrow}>
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </Link>
      <Grid container className={classes.grid}>
        {loadingStatus === LoadingStatusEnum.pending
          ? displaySkeletons()
          : displayPostPreviewCards()}
      </Grid>
    </>
  );
};
