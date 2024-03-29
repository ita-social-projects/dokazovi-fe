import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './ExpertOpinionPostPreviewCard.styles';
import { formatDate } from '../../../../utilities/formatDate';
import { IPostPreviewCardProps } from '../types';
import { langTokens } from '../../../../locales/localizationInit';

export const ExpertOpinionPostPreviewCard: React.FC<IPostPreviewCardProps> = ({
  post,
  shouldNotUseLink,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const expertLink = `/experts/${post.author?.id}`;
  const postLink = `/posts/${post.id}`;
  const authorFullName = `${post.author?.firstName} ${post.author?.lastName}`;
  const expertOrigin = (
    <Typography
      className={classes.postType}
      variant="overline"
      component="span"
    >
      {t(langTokens.experts.expertOpinion)}
    </Typography>
  );

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
        gridGap={15}
        justifyContent="space-between"
        mb={4}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          pt={4}
        >
          {shouldNotUseLink ? (
            expertOrigin
          ) : (
            <Link to={postLink}>{expertOrigin}</Link>
          )}
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
          image={post.author?.avatar} // paste default avatar if not present
          title={authorFullName}
          component="div"
          data-testid="avatar"
        />
      </Box>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        component="span"
        gutterBottom
      >
        {post.author?.bio}
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
          {formatDate(post.publishedAt)}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Card className={classes.root}>
      {shouldNotUseLink ? (
        expertBody
      ) : (
        <Link to={expertLink} target="_blank">
          {expertBody}
        </Link>
      )}
      {shouldNotUseLink ? (
        postBody
      ) : (
        <Link to={postLink} target="_blank">
          {postBody}
        </Link>
      )}
    </Card>
  );
};
