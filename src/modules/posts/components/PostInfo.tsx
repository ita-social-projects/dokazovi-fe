import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import PostDirectionLink from '../../../lib/components/PostDirectionLink';
import { IPost } from '../../../lib/types';
import { useStyles } from '../styles/PostInfo.styles';

export interface IPostInfoProps {
  post: IPost;
}

const ExpertInfo: React.FC<IPostInfoProps> = ({ post }) => {
  console.log(post);
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid container className={classes.personalInfo}>
        <h1>{post.title}</h1>
      </Grid>
    </Grid>
  );
};

export default ExpertInfo;
