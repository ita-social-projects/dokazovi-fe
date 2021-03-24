/* eslint-disable react/no-danger */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Typography, CardMedia } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from '../styles/PostView.styles';
import { IPost } from '../../../lib/types';
import { ConfirmationModalWithButton } from '../../../lib/components/Modals/ConfirmationModalWithButton';

export interface IPostViewProps {
  post: IPost;
  modificationAllowed?: boolean;
  onDelete?: () => void;
}

const PostView: React.FC<IPostViewProps> = ({
  post,
  modificationAllowed,
  onDelete,
}) => {
  const classes = useStyles();
  const authorFullName = `${post.author.firstName} ${post.author.lastName}`;
  const authorMainInstitution = post.author.mainInstitution
    ? `${post.author.mainInstitution.city.name}, ${post.author.mainInstitution.name}`
    : '';
  const postContent = post.content ?? 'There is no post content';

  return (
    <Card className={classes.cardContainer}>
      <Box className={classes.authorBlock}>
        <Link to={`/experts/${post.author.id}`}>
          <CardMedia
            className={classes.avatar}
            image={post.author.avatar} // paste default avatar if not present
            title={authorFullName}
            component="div"
          />
        </Link>
        <Box>
          <Link to={`/experts/${post.author.id}`}>
            <Typography variant="h4">{authorFullName}</Typography>
          </Link>
          <Typography variant="subtitle1" color="textSecondary">
            {authorMainInstitution}
          </Typography>
        </Box>
        {modificationAllowed && (
          <Box className={classes.actionsBlock}>
            <Link to={`/update-post?id=${post.id}`}>
              <EditIcon />
            </Link>
            {onDelete && (
              <ConfirmationModalWithButton
                message={`Ви дійсно бажаєте безповоротно видалити матеріал '${post.title}'?`}
                buttonIcon={<DeleteIcon />}
                onConfirmButtonClick={onDelete}
              />
            )}
          </Box>
        )}
      </Box>
      <Box className={classes.contentRoot}>
        {post.title && (
          <Typography variant="h1" gutterBottom>
            {post.title}
          </Typography>
        )}
        <Typography className={classes.createdAt} variant="caption">
          {post.createdAt}
        </Typography>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{
            __html: postContent,
          }}
        />
      </Box>
    </Card>
  );
};

export default PostView;
