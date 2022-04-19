import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditIcon from '@material-ui/icons/Edit';
import AddOutlined from '@material-ui/icons/AddOutlined';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../styles/PostPreviewWrapper.styles';
import {
  addToImportant,
  removeFromImportant,
  replacePost,
} from '../../../../../../models/main/reducers';
import { ImportantPostPreviewCard } from '../../../../../../components/Posts/Cards/ImportantPostPreviewCard/ImportantPostPreviewCard';
import { IPost, ViewModsType } from '../../../../types';
import { useActions } from '../../../../../../shared/hooks';
import { langTokens } from '../../../../../../locales/localizationInit';
import { ConfirmationModalWithButton } from '../../../Modals/ConfirmationModalWithButton';

interface IPostPreviewWrapper {
  post: IPost;
  position: number;
  viewMode: ViewModsType;
  postsAmount: number;
  updateRemovedPosts: (post: IPost, status: ViewModsType) => void;
  forDeviceType: 'desktop' | 'mobile' | 'tablet';
}

const PostPreviewWrapper: React.FC<IPostPreviewWrapper> = ({
  post,
  position,
  viewMode,
  postsAmount,
  updateRemovedPosts,
  forDeviceType,
}) => {
  const { t } = useTranslation();
  const [isHovered, switchHover] = useState(false);
  const [newPosition, changePosition] = useState<number | string>(position);
  const classes = useStyles({ refineInputPadding: newPosition > 9 });
  const [
    boundAddToImportant,
    boundRemoveFromImportant,
    boundReplacePost,
  ] = useActions([addToImportant, removeFromImportant, replacePost]);
  const history = useHistory();

  useEffect(() => {
    changePosition(position);
  }, [position]);

  const addPostToImportant = (newPost: IPost) => {
    if (postsAmount === 99) {
      toast.warn(t(langTokens.admin.maxImportantPostCountReached));
      return;
    }

    boundAddToImportant(newPost);
    updateRemovedPosts(newPost, viewMode);
  };

  const removePostFromImportant = (newPost: IPost) => {
    boundRemoveFromImportant(newPost);
    updateRemovedPosts(newPost, viewMode);
  };

  const swapPosts = () => {
    if (position === newPosition || !newPosition) {
      changePosition(position);
      return;
    }
    const numericPosition = newPosition as number;

    boundReplacePost({
      previousPosition: position - 1,
      newPosition: numericPosition - 1,
    });
  };

  const handlePositionChange = (changedPosition: number) => {
    let updatedPosition: number | string = changedPosition;

    if (updatedPosition > postsAmount) {
      updatedPosition = postsAmount;
    } else if (updatedPosition <= 0) {
      updatedPosition = '';
    }

    changePosition(updatedPosition);
  };

  const buttonIconStyle = {
    padding: '3px',
    color: '#000',
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: '#fff',
  };

  const handleAddClick = () => {
    addPostToImportant(post);
  };

  const handleEditClick = () => {
    history.push(`/edit-post?id=${post.id}`, {
      from: history.location.pathname,
    });
  };

  return (
    <Box
      className={`${classes.postPreviewWrapper} postPreview`}
      tabIndex={0}
      onFocus={() => switchHover(true)}
      onBlur={() => switchHover(false)}
      onMouseOver={() => switchHover(true)}
      onMouseLeave={() => switchHover(false)}
    >
      {viewMode === 'selected' && (
        <Box className={classes.cardButtons}>
          <Input
            className={classes.orderNumberInput}
            disableUnderline
            type="number"
            value={newPosition}
            onChange={(e) => handlePositionChange(Number(e.target.value))}
            onKeyUp={(e) => e.key === 'Enter' && swapPosts()}
            onBlur={swapPosts}
          />
          <ConfirmationModalWithButton
            message={t(langTokens.admin.removeFromCarousel)}
            onConfirmButtonClick={() => removePostFromImportant(post)}
            buttonIcon={<DeleteIcon />}
            iconStyle={buttonIconStyle}
          />
        </Box>
      )}

      {viewMode === 'preview' && isHovered && (
        <>
          <Box className={classes.cardButtons}>
            <AddOutlined
              className={classes.leftTopButton}
              onClick={handleAddClick}
            />
            <EditIcon
              className={classes.rightTopButton}
              onClick={handleEditClick}
            />
          </Box>
        </>
      )}

      {viewMode === 'preview' && !isHovered && (
        <>
          <Typography
            className={classes.previwTitle}
            variant="h4"
            align="center"
          >
            {post.title}
          </Typography>
        </>
      )}

      <Box className="unclicable">
        <ImportantPostPreviewCard
          post={post}
          size="small"
          forDeviceType={forDeviceType}
        />
      </Box>
    </Box>
  );
};

export default PostPreviewWrapper;
