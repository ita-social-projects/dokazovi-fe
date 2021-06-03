import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './TranslationPostPreviewCard.styles';
import { formatDate } from '../../../../utilities/formatDate';
import background from '../mock_img_translation_bg.png';
import { IPostPreviewCardProps } from '../types';

export const TranslationPostPreviewCard: React.FC<IPostPreviewCardProps> = ({
  post,
  shouldNotUseLink,
}) => {
  const bgImageURL = post.previewImageUrl ? post.previewImageUrl : background;
  const classes = useStyles({ backgroundImageUrl: bgImageURL });
  const postLink = `/posts/${post.id}`;
  const materialsLink = `/materials?source=3`;
  const authorFullName = `${post.author.firstName} ${post.author.lastName}`;
  // const authorMainInstitution = post.author.mainInstitution
  //   ? `${post.author.mainInstitution.city.name}, ${post.author.mainInstitution.name}`
  //   : '';

  const cardHeader = (
    <Box className={classes.header} data-testid="bgImage">
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
          Переклад
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
  );

  const cardBody = (
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
          {post.author.bio}
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
  );

  return (
    <Card className={classes.root}>
      {shouldNotUseLink ? cardHeader : <Link to={postLink}>{cardHeader}</Link>}
      {shouldNotUseLink ? cardBody : <Link to={materialsLink}>{cardBody}</Link>}
    </Card>
  );
};
