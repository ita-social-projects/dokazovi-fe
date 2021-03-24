import React from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useStyles } from '../../../lib/styles/PostCreationButtons.styles';

export interface IPostCreationButtonsProps {
  publishPost: () => void;
  goPreview: () => void;
  isOnPreview?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
  publishPost,
  goPreview,
  isOnPreview,
  disabled,
  loading,
}) => {
  const classes = useStyles();
  const buttonText = isOnPreview
    ? 'Назад до редагування'
    : 'Попередній перегляд';

  return (
    <>
      <Box className={classes.buttonHolder}>
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          disabled={disabled || loading}
          onClick={goPreview}
        >
          {buttonText}
        </Button>
        <Button disabled={disabled} variant="contained" onClick={publishPost}>
          {!loading ? 'Опублікувати' : <CircularProgress size={20} />}
        </Button>
      </Box>
    </>
  );
};

export default PostCreationButtons;
