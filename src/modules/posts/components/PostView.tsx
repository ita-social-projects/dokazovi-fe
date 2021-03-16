import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Typography, CardMedia } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from '../styles/PostView.styles';
import { IPost } from '../../../lib/types';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import ConfirmModal from '../../../lib/components/Modals/ConfirmModal';

export interface IPostViewProps {
  post: IPost;
  deleteHandler?: () => void;
}

const PostView: React.FC<IPostViewProps> = ({ post, deleteHandler }) => {
  const role = 'admin'; //  useSelector && token

  const classes = useStyles();
  const authorFullName = `${post.author.firstName} ${post.author.lastName}`;
  const authorMainInstitution = post.author.mainInstitution
    ? `${post.author.mainInstitution.city.name}, ${post.author.mainInstitution.name}`
    : '';
  const postContent = post.content ?? 'There is no post content';

  return (
    <>
      <PageTitle title={post.title} />

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
          <Box className={classes.controlBlock}>
            {
              role === 'admin' ? (
                deleteHandler ? (
                  <ConfirmModal
                    title={''}
                    icon={<DeleteIcon />}
                    handleChoice={deleteHandler}
                  />
                ) : null
              ) : null
              // user type admin
            }
          </Box>
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
          <Typography variant="body1">
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html: postContent,
              }}
            />
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default PostView;
