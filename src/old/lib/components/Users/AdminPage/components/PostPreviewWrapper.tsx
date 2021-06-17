import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { useStyles } from '../styles/PostPreviewWrapper.styles';
import {
  addToImportant,
  removeFromImportant,
  replacePost,
} from '../../../../../../models/main/reducers';
import { ImportantPostPreviewCard } from '../../../../../../components/Posts/Cards/ImportantPostPreviewCard/ImportantPostPreviewCard';
import { IPost, ViewModsType } from '../../../../types';

interface IPostPreviewWrapper {
  post: IPost;
  position: number;
  viewMode: ViewModsType;
  sectionLength?: number;
  updateRemovedPosts: (post: IPost, status: ViewModsType) => void;
}

const PostPreviewWrapper: React.FC<IPostPreviewWrapper> = ({
  post,
  position,
  viewMode,
  sectionLength,
  updateRemovedPosts,
}) => {
  const [isHovered, switchHover] = useState(false);
  const [newPosition, changePosition] = useState<number | string>(position);
  const classes = useStyles({ refineInputPadding: newPosition > 9 });
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    changePosition(position);
  }, [position]);

  const addPostToImportant = (newPost: IPost) => {
    dispatch(addToImportant(newPost));
    updateRemovedPosts(newPost, viewMode);
  };
  const removePostFromImportant = (newPost: IPost) => {
    dispatch(removeFromImportant(newPost));
    updateRemovedPosts(newPost, viewMode);
  };

  const swapPosts = () => {
    if (position === newPosition || !newPosition) {
      changePosition(position);
      return;
    }
    const numericPosition = newPosition as number;

    dispatch(
      replacePost({
        previousPosition: position - 1,
        newPosition: numericPosition - 1,
      }),
    );
  };

  const handlePositionChange = (changedPosition: number) => {
    const castedSectionLength = sectionLength as number;
    let updatedPosition: number | string = changedPosition;

    if (updatedPosition > castedSectionLength) {
      updatedPosition = castedSectionLength;
    } else if (updatedPosition <= 0) {
      updatedPosition = '';
    }

    changePosition(updatedPosition);
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
        <>
          <Input
            className={classes.orderNumberInput}
            disableUnderline
            type="number"
            value={newPosition}
            onChange={(e) => handlePositionChange(Number(e.target.value))}
            onKeyUp={(e) => e.key === 'Enter' && swapPosts()}
            onBlur={swapPosts}
          />
          <IconButton
            size="small"
            classes={{ root: classes.iconButton }}
            onClick={() => removePostFromImportant(post)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
      {viewMode === 'preview' && isHovered && (
        <div className={classes.cardHoverView}>
          <Typography
            className={classes.cardHoverButtons}
            display="block"
            variant="button"
            onClick={() => addPostToImportant(post)}
          >
            Додати
          </Typography>
          <Typography
            className={classes.cardHoverButtons}
            display="block"
            variant="button"
            onClick={() =>
              history.push(`/edit-post?id=${post.id}`, {
                from: history.location.pathname,
              })
            }
          >
            Редагувати
          </Typography>
        </div>
      )}
      <Box className="unclicable">
        <ImportantPostPreviewCard post={post} size="small" />
      </Box>
    </Box>
  );
};

export default PostPreviewWrapper;
