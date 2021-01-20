import React from 'react';
import { Card, Box, Typography, CardMedia } from '@material-ui/core';
import BorderBottom from '../../../lib/components/Border';
import PostDirectionLink from '../../../lib/components/PostDirectionLink';
import { post } from '../mockPost/mockPost';
import { useStyles } from '../styles/PostView.styles';
import { INewPostDraft } from '../../postCreation/store/postCreationSlice';

export interface IPostPreviewProps {
  draft: INewPostDraft;
}

const PostPreview: React.FC<IPostPreviewProps> = ({ draft }) => {
  const classes = useStyles();

  let authorFullName = '';
  if (post.author?.firstName && post.author?.lastName) {
    authorFullName = `${post.author?.firstName} ${post.author?.lastName}`;
  }

  return (
    <Card>
      <Box className={classes.autorBlock}>
        <Box>
          <CardMedia
            style={{ padding: '15px', height: '58px', width: 46 }}
            className={classes.avatar}
            image={post?.author?.avatar}
            title={authorFullName}
          />
        </Box>
        <Box>
          <Typography
            align="left"
            variant="body1"
            component="h3"
            style={{ margin: '5px', textDecoration: 'underline' }}
          >
            {authorFullName}
          </Typography>
          <Typography
            align="left"
            variant="subtitle2"
            component="h3"
            style={{ padding: '5px' }}
          >
            {post.author?.mainInstitution?.city.name},{' '}
            {post.author?.mainInstitution?.name}
          </Typography>
        </Box>
      </Box>
      <BorderBottom />
      <Box>
        <Typography className={classes.direction}>
          {post.directions?.map((d) => {
            return <PostDirectionLink direction={d} key={d.id} />;
          })}
        </Typography>
        <Typography variant="h4" className={classes.title}>
          {draft.title}
        </Typography>
      </Box>
      <Box>
        <div dangerouslySetInnerHTML={{ __html: draft.htmlContent }} />
        <Typography className={classes.createdAt}>{post.createdAt}</Typography>
      </Box>
    </Card>
  );
};

export default PostPreview;
