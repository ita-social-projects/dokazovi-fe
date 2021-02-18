import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Box, Chip } from '@material-ui/core';
import { useStyles } from '../styles/PostCard.styles';
import { IPost } from '../types';
import PostDirectionLink from './PostDirectionLink';

export interface IPostCardProps {
  post: IPost;
}

export const PostCard: React.FC<IPostCardProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { post } = props;
  const author = post.author?.id || '';

  const goPostPage = () => {
    history.push(`/posts/${post.id}`);
  };

  const goExpertPage = () => {
    history.push(`/experts/${author}`);
  };

  return (
    <Card className={classes.root}>
      <Box className={classes.leftPart} onClick={goExpertPage}>
        <CardMedia
          className={classes.photo}
          image={post.author?.avatar}
          title="doctor"
        />
        <Typography
          className={classes.fullName}
          component="p"
          variant="subtitle2"
          gutterBottom
          align="center"
        >
          {post.author?.firstName} {post.author?.lastName}
        </Typography>
        <Typography component="p" variant="body2" gutterBottom align="center">
          {post.author?.mainInstitution?.name}
        </Typography>
      </Box>
      <Box className={classes.rightPart} onClick={goPostPage}>
        <Box className={classes.chipRoot}>
          <Chip label={post.postType?.name} size="small" clickable />
          <Box display="flex" flexDirection="column">
            {post.directions?.map((d) => {
              return <PostDirectionLink direction={d} key={d.id} />;
            })}
          </Box>
        </Box>
        <Typography variant="body1" component="p" align="center">
          {post.title}
        </Typography>
      </Box>
    </Card>
  );
};
