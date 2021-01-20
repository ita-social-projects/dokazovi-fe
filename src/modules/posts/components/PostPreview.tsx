import React from 'react';
import { Card, Box, Typography } from '@material-ui/core';
import { post } from '../mockPost/mockPost';
import { useStyles } from '../styles/PostView.styles';
import { INewPostDraft } from '../../postCreation/store/postCreationSlice';
import PostInfo from './PostInfo';

export interface IPostPreviewProps {
  draft: INewPostDraft;
}

const PostPreview: React.FC<IPostPreviewProps> = ({ draft }) => {
  const classes = useStyles();
  return (
    <Card>
      <PostInfo post={post} />
      <Box>
        <Typography variant="h4" className={classes.title}>
          {draft.title}
        </Typography>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: draft.htmlContent }}
        />
        <Typography className={classes.createdAt}>{post.createdAt}</Typography>
      </Box>
    </Card>
  );
};

export default PostPreview;
