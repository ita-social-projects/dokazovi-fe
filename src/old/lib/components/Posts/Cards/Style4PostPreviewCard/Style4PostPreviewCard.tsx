import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { useStyles } from './Style4PostPreviewCard.styles';
import { formatDate } from '../../../../utilities/formatDate';
import { IPostPreviewCardProps } from '../types';

export const Style4PostPreviewCard: React.FC<IPostPreviewCardProps> = ({
  post,
  shouldNotUseLink,
}) => {
  const classes = useStyles();
  const expertLink = `/experts/${post.author.id}`;
  const postLink = `/posts/${post.id}`;
  const authorFullName = `${post.author.firstName} ${post.author.lastName}`;
  const authorMainInstitution = post.author.mainInstitution
    ? `${post.author.mainInstitution.city.name}, ${post.author.mainInstitution.name}`
    : '';

  const expertBody = (
    <Box
      className={classes.header}
      flexDirection="column"
      flexWrap="no-wrap"
      justifyContent="space-between"
      mb={6}
    >
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="no-wrap"
        justifyContent="space-between"
        mb={4}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          pt={4}
        >
          <Typography
            className={classes.postType}
            variant="overline"
            component="span"
          >
            {post.type.name}
          </Typography>
          <Typography
            className={classes.authorFullName}
            variant="h5"
            component="span"
          >
            {authorFullName}
          </Typography>
        </Box>
        <CardMedia
          className={classes.avatar}
          image={post.author.avatar} // paste default avatar if not present
          title={authorFullName}
          component="div"
        />
      </Box>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        component="span"
        gutterBottom
      >
        {authorMainInstitution}
      </Typography>
    </Box>
  );

  const postBody = (
    <Box className={classes.body}>
      <CardContent className={classes.content}>
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
      </CardContent>
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
      {shouldNotUseLink ? (
        expertBody
      ) : (
        <Link to={expertLink}>{expertBody}</Link>
      )}
      {shouldNotUseLink ? postBody : <Link to={postLink}>{postBody}</Link>}
    </Card>
  );
};
