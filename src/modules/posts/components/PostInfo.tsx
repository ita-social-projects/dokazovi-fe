import React from 'react';
import { Box, Typography, CardMedia } from '@material-ui/core';
import { IPost } from '../../../lib/types';
import { useStyles } from '../styles/PostViewInfo.styles';
import PostDirectionLink from '../../../lib/components/PostDirectionLink';
import BorderBottom from '../../../lib/components/Border';

export interface IPostInfoProps {
  post: IPost;
}

const PostInfo: React.FC<IPostInfoProps> = ({ post }) => {
  const classes = useStyles();

  let authorFullName = '';
  if (post.author?.firstName && post.author?.lastName) {
    authorFullName = `${post.author?.firstName} ${post.author?.lastName}`;
  }

  return (
    <>
      <Box className={classes.authorBlock}>
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
      </Box>
    </>
  );
};

export default PostInfo;
