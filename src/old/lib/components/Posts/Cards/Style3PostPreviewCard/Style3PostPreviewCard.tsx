import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './Style3PostPreviewCard.styles';
import { formatDate } from '../../../../utilities/formatDate';
import background from '../../../../images/mock_img_translation_bg.png';
import { IPostPreviewCardProps } from '../types';

export const Style3PostPreviewCard: React.FC<IPostPreviewCardProps> = ({
  post,
  shouldNotUseLink,
}) => {
  const classes = useStyles();
  const postLink = `/posts/${post.id}`;
  const authorFullName = `${post.author.firstName} ${post.author.lastName}`;
  const authorMainInstitution = post.author.mainInstitution
    ? `${post.author.mainInstitution.city.name}, ${post.author.mainInstitution.name}`
    : '';

  const bgImageURL = post.previewImageUrl ? post.previewImageUrl : background;

  const card = (
    <>
      <Box
        className={classes.header}
        flexDirection="column"
        flexWrap="no-wrap"
        justifyContent="space-between"
        mb={6}
        style={{
          backgroundImage: `url(${bgImageURL})`,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          pt={4}
          mb={6}
        >
          <Typography
            className={classes.postType}
            variant="overline"
            component="span"
          >
            {post.type.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h4"
            component="h3"
            className={classes.textHeader}
          >
            {post.title}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.body}>
        <Box mb={1.2}>
          <Typography
            className={classes.authorFullName}
            variant="h5"
            component="span"
          >
            {authorFullName}
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
            component="span"
            gutterBottom
          >
            {authorMainInstitution}
          </Typography>
        </Box>
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
