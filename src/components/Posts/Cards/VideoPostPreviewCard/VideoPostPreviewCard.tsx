import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './VideoPostPreviewCard.styles';
import { formatDate } from '../../../../utilities/formatDate';
// import background from '../mock_img_media_bg.png';
import { IPostPreviewCardProps } from '../types';

export const VideoPostPreviewCard: React.FC<IPostPreviewCardProps> = ({
  post,
  shouldNotUseLink,
}) => {
  const classes = useStyles();
  const postLink = `/posts/${post.id}`;

  // const bgImageURL = post.previewImageUrl ? post.previewImageUrl : background;
  const url = post.videoUrl;

  const card = (
    <>
      <Box
        className={classes.header}
        flexDirection="column"
        flexWrap="no-wrap"
        justifyContent="space-between"
        // style={{
        //   backgroundImage: `url(${bgImageURL})`,
        // }}
      >
        {/* <Box className={classes.play} /> */}
        <iframe src={url} width="100%" height="100%" title={post.title} />
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
          dangerouslySetInnerHTML={{
            __html: post.preview,
          }}
        />
        <Box mb={6}>
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
