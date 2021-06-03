/* eslint-disable react/no-danger */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from '../styles/PostView.styles';
import { IPost } from '../../../lib/types';
import { ConfirmationModalWithButton } from '../../../lib/components/Modals/ConfirmationModalWithButton';
import PostInfo from '../../../../components/Posts/PostInfo/PostInfo';
import TopSection from '../../../../components/Posts/TopSection/TopSection';
import SecondTopSection from '../../../../components/Posts/SecondTopSection/SecondTopSection';
// import {
//   MEDIATEKA_ARTICLE_MOCK,
//   MEDIATEKA_ARTICLE_SmHeaders_MOCK,
//   MEDIATEKA_ARTICLE_Intro_SmHeaders_MOCK,
// } from '../__mocks__/postContent';

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

  const postContent = post.content ?? 'There is no post content';
  const postInfo = {
    directions: post.directions,
    origins: post.origins,
    type: post.type,
    publishedAt: post.publishedAt,
    counter: post.counter,
  };

  return (
    <Card className={classes.cardContainer}>
      <Box className={classes.wrapper}>
        {post.type.name !== 'Переклад' && <TopSection author={post.author} />}
        {modificationAllowed && (
          <Box className={classes.actionsBlock}>
            <Link to={`/edit-post?id=${post.id}`}>
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
        <Box className={classes.contentRoot}>
          {post.title && (
            <Typography variant="h1" gutterBottom>
              {post.title}
            </Typography>
          )}

          {post.type.name === 'Переклад' && (
            <SecondTopSection author={post.author} />
          )}

          <PostInfo info={postInfo} />
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: postContent,
            }}
            // dangerouslySetInnerHTML={{
            //   __html: MEDIATEKA_ARTICLE_Intro_SmHeaders_MOCK,
            // }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default PostView;
