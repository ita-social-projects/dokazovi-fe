/* eslint-disable react/no-danger */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../styles/PostView.styles';
import { IPost } from '../../../lib/types';
import { ConfirmationModalWithButton } from '../../../lib/components/Modals/ConfirmationModalWithButton';
import PostInfo from '../../../../components/Posts/PostInfo/PostInfo';
import TopSection from '../../../../components/Posts/TopSection/TopSection';
import SecondTopSection from '../../../../components/Posts/SecondTopSection/SecondTopSection';
import { langTokens } from '../../../../locales/localizationInit';
import { AuthContext } from '../../../provider/AuthProvider/AuthContext';

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
  const { t } = useTranslation();

  const { authenticated } = useContext(AuthContext);
  const classes = useStyles();

  const postContent = post.content ?? 'There is no post content';
  const postInfo = {
    directions: post.directions,
    origins: post.origins,
    type: post.type,
    publishedAt: post.publishedAt,
    uniqueViewsCounter: post.uniqueViewsCounter,
    videoUrl: post.videoUrl,
  };

  return (
    <Card className={classes.cardContainer}>
      <Box className={classes.wrapper}>
        {post.origins[0].name !== t(langTokens.common.translation) && (
          <TopSection author={post.author} />
        )}

        {authenticated && (
          <Box className={classes.actionsBlock}>
            <Link to={`/edit-post?id=${post.id}`}>
              <EditIcon className={classes.iconBlack} />
            </Link>
            {onDelete && (
              <ConfirmationModalWithButton
                message={`${t(langTokens.materials.needToDeleteMaterial)} '${
                  post.title
                }'?`}
                buttonIcon={<DeleteIcon className={classes.iconBlack} />}
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

          {post.origins[0].name === t(langTokens.common.translation) && (
            <SecondTopSection author={post.author} />
          )}

          <PostInfo info={postInfo} />
          {post.type.name === t(langTokens.common.video) && (
            <iframe
              className={classes.video}
              src={post.videoUrl}
              title={post.title}
              width="100%"
              height="100%"
            />
          )}
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: postContent,
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default PostView;
