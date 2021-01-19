import { Card, Box, Typography, CardMedia } from '@material-ui/core';
import React from 'react';
import BorderBottom from '../../../lib/components/Border';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import PostDirectionLink from '../../../lib/components/PostDirectionLink';
import { useStyles } from '../styles/PostView.styles';
import { IPost } from '../../../lib/types';

export interface IPostViewProps {
  post: IPost;
}

const PostView: React.FC = ({ post }) => {
  const classes = useStyles();

  return (
    <Card>
      <Box className={classes.autorBlock}>
        <Box>
          <CardMedia
            style={{ padding: '15px', height: '58px', width: 46 }}
            className={classes.avatar}
            image={post.author.avatar}
            title={`${post.author.firstName} ${post.author.lastName}`}
          />
        </Box>
        <Box>
          <Typography
            align="left"
            variant="body1"
            component="h3"
            style={{ margin: '5px', textDecoration: 'underline' }}
          >
            {`${post.author.firstName} ${post.author.lastName}`}
          </Typography>
          <Typography
            align="left"
            variant="subtitle2"
            component="h3"
            style={{ padding: '5px' }}
          >
            {post.author.mainInstitution.city.name},{' '}
            {post.author.mainInstitution.name}
          </Typography>
        </Box>
      </Box>
      <BorderBottom />
      <Box>
        <Typography className={classes.direction}>
          {post.directions.map((d) => {
            return <PostDirectionLink direction={d} key={d.id} />;
          })}
        </Typography>
        <Typography className={classes.title}>{post.title}</Typography>
      </Box>
      <Box>
        <Typography className={classes.content}>{post.content}</Typography>
        <Typography className={classes.createdAt}>{post.createdAt}</Typography>
      </Box>
    </Card>
  );
};

export default PostView;
