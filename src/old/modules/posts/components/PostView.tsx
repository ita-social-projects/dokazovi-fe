/* eslint-disable react/no-danger */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ScreenContext } from 'old/provider/MobileProvider/ScreenContext';
import { useStyles } from '../styles/PostView.styles';
import { IPost } from '../../../lib/types';
import { ConfirmationModalWithButton } from '../../../lib/components/Modals/ConfirmationModalWithButton';
import PostInfo from '../../../../components/Posts/PostInfo/PostInfo';
import TopSection from '../../../../components/Posts/TopSection/TopSection';
import SecondTopSection from '../../../../components/Posts/SecondTopSection/SecondTopSection';
import { langTokens } from '../../../../locales/localizationInit';
import { PostBreadcrumbs } from '../../../../components/Breadcrumbs/PostBreadcrumbs';
import { selectCurrentUser } from '../../../../models/user';
import { selectAuthorities } from '../../../../models/authorities';

export interface IPostViewProps {
  post: IPost;
  modificationAllowed?: boolean;
  onDelete?: () => void;
  isPreview?: boolean;
}

const PostView: React.FC<IPostViewProps> = ({ isPreview, post, onDelete }) => {
  const { t } = useTranslation();

  const user = useSelector(selectCurrentUser);
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities?.data?.includes('SET_IMPORTANCE');
  const permission = user?.data?.id === post?.author?.id || isAdmin;

  const isTopSectionShown =
    post.origins[0].name !== t(langTokens.common.translation);

  const classes = useStyles({ isTopSectionShown });
  const { mobile } = useContext(ScreenContext);
  const [origin] = post.origins;

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
      <PostBreadcrumbs
        origins={post.origins}
        expert={{
          id: post.author.id,
          expertName: `${post.author.firstName} ${post.author.lastName}`,
        }}
        materialTitle={post.title}
        type={post.type}
      />
      <Box className={classes.wrapper}>
        {isTopSectionShown && <TopSection author={post.author} />}

        {!mobile && !isPreview && permission && (
          <Box className={classes.actionsBlock}>
            <Link data-testid="editor link" to={`/edit-post?id=${post.id}`}>
              <EditIcon className={classes.iconBlack} />
            </Link>
            {onDelete && (
              <ConfirmationModalWithButton
                message={`${t(langTokens.materials.needToDeleteMaterial)} '${
                  post.title
                }'?`}
                buttonIcon={
                  <DeleteIcon
                    data-testid="delete button"
                    className={classes.iconBlack}
                  />
                }
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
            <SecondTopSection author={post.author} origin={origin.id} />
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
