import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import PostDirectionLink from '../../../lib/components/PostDirectionLink';
import { IPost } from '../../../lib/types';
import { useStyles } from '../styles/PostInfo.styles';

export interface IPostInfoProps {
  post: IPost;
}

const PostInfo: React.FC<IPostInfoProps> = ({ post }) => {
  console.log(post);
  const classes = useStyles();
  return <div>PostInfo</div>;
};

export default PostInfo;
