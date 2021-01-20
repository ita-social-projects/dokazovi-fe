import { Container, Card, Box, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../styles/PostView.styles';
import { IPost } from '../../../lib/types';
import PostInfo from './PostInfo';

export interface IPostViewProps {
  post: IPost;
}

const PostView: React.FC<IPostViewProps> = ({ post }) => {
  const classes = useStyles();

  return (
    <Container>
      <Card>
        <PostInfo post={post} />
        <Box>
          <Typography variant="h4" className={classes.title}>
            {post.title}
          </Typography>
          <Typography className={classes.content}>{post.content}</Typography>
          <Typography className={classes.createdAt}>
            {post.createdAt}
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default PostView;
