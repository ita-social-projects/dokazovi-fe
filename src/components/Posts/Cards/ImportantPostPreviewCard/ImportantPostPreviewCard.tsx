/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './ImportantPostPreviewCard.styles';
import { IPostPreviewCardProps } from '../types';
import background from '../mock_img_slider_bg.png';

export const ImportantPostPreviewCard: React.FC<IPostPreviewCardProps> = (
  props,
) => {
  const { post, size = 'large', forDeviceType } = props;

  let bgImageURL = background;
  switch (true) {
    case forDeviceType === 'desktop':
      bgImageURL = post.importantImageUrl || background;
      break;
    case forDeviceType === 'mobile':
      bgImageURL = post.importantMobileImageUrl || background;
      break;
    case forDeviceType === 'tablet':
      bgImageURL = background;
      break;
    default:
      break;
  }

  const classes = useStyles({ backgroundImageUrl: bgImageURL, size });
  const history = useHistory();

  const goPostPage = () => {
    history.push(`/posts/${post.id}`);
  };

  return (
    <div
      className={classes.root}
      data-testid="post-slider"
      onClick={goPostPage}
    />
  );
};
