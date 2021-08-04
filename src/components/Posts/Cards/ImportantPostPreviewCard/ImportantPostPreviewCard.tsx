import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './ImportantPostPreviewCard.styles';
import { IPostPreviewCardProps } from '../types';
import background from '../mock_img_slider_bg.png';

export const ImportantPostPreviewCard: React.FC<IPostPreviewCardProps> = (
  props,
) => {
  const { post, size = 'large' } = props;
  const bgImageURL = post.importantImageUrl
    ? post.importantImageUrl
    : background;
  const classes = useStyles({ backgroundImageUrl: bgImageURL, size });
  const history = useHistory();

  const goPostPage = () => {
    history.push(`/posts/${post.id}`);
  };

  return <div className={classes.root} onClick={goPostPage}></div>;
};
