import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './MediaPostPreviewCard.styles';
import { formatDate } from '../../../../utilities/formatDate';
import background from '../mock_img_media_bg.png';
import { IPostPreviewCardProps } from '../types';

export const MediaPostPreviewCard: React.FC<IPostPreviewCardProps> = ({
  post,
  shouldNotUseLink,
}) => {
  const bgImageURL = post.previewImageUrl ? post.previewImageUrl : background;
  const classes = useStyles({ backgroundImageUrl: `url(${bgImageURL})` });
  const postLink = `/posts/${post.id}`;

  const card = (
    <>
      <Box
        className={classes.header}
        flexDirection="column"
        flexWrap="no-wrap"
        justifyContent="space-between"
        data-testid="bgImage"
      >
        <Typography
          className={classes.postType}
          variant="overline"
          component="span"
        >
          Медитека
        </Typography>
      </Box>
      <Box className={classes.body}>
        <Typography
          gutterBottom
          variant="h4"
          component="h3"
          className={classes.textHeader}
        >
          {post.title}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textPrimary"
          component="p"
          className={classes.textBody}
        >
          {post.preview}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={6}
        >
          <Typography variant="caption" color="textSecondary">
            {formatDate(post.createdAt)}
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <Card className={classes.root}>
      {shouldNotUseLink ? card : <Link to={postLink}>{card}</Link>}
    </Card>
  );
};
