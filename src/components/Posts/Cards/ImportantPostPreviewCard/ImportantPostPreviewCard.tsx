import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './ImportantPostPreviewCard.styles';
import { IPostPreviewCardProps } from '../types';
import background from '../mock_img_slider_bg.png';

export const ImportantPostPreviewCard: React.FC<IPostPreviewCardProps> = (
  props,
) => {
  const { post, size = 'large' } = props;
  const bgImageURL = post.previewImageUrl ? post.previewImageUrl : background;
  const classes = useStyles({ backgroundImageUrl: bgImageURL, size });
  const history = useHistory();
  const author = post.author.id || '';

  const goPostPage = () => {
    history.push(`/posts/${post.id}`);
  };

  const goExpertPage = () => {
    history.push(`/experts/${author}`);
  };

  return (
    <div className={classes.root}>
      <Typography
        component="p"
        variant="h4"
        onClick={goExpertPage}
        className={classes.authorsName}
      >
        {post.author.firstName} {post.author.lastName}
      </Typography>
      <Typography
        component="p"
        variant="subtitle2"
        className={classes.authorsDetails}
      >
        {post.author.mainInstitution?.name}
      </Typography>
      <Typography
        variant="h2"
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
    </div>
  );
};
