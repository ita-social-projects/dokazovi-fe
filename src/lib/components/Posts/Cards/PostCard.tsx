import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../../styles/PostCard.styles';
import { IPost } from '../../../types';

export interface IPostCardProps {
  post: IPost;
}

export const PostCard: React.FC<IPostCardProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { post } = props;
  const author = post.author.id || '';

  const goPostPage = () => {
    history.push(`/posts/${post.id}`);
  };

  const goExpertPage = () => {
    history.push(`/experts/${author}`);
  };

  return (
    <Card className={classes.root}>
      <Typography
        component="p"
        variant="h4"
        gutterBottom
        onClick={goExpertPage}
        className={classes.h4}
      >
        {post.author.firstName} {post.author.lastName}
      </Typography>
      <Typography
        component="p"
        variant="subtitle2"
        gutterBottom
        className={classes.subtitle2}
      >
        {post.author.mainInstitution?.name}
      </Typography>
      <Typography
        variant="h1"
        component="p"
        onClick={goPostPage}
        className={classes.title}
      >
        {post.title}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        onClick={goPostPage}
        className={classes.preview}
      >
        {post.preview}
      </Typography>
    </Card>
  );
};
