import React from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useStyles } from '../../../lib/styles/PostCreationButtons.styles';

export interface IPostCreationButtonsProps {
  onPublishClick: () => void;
  onPreviewClick: () => void;
  previewing?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
  onPublishClick,
  onPreviewClick,
  previewing,
  disabled,
  loading,
}) => {
  const classes = useStyles();
  const buttonText = previewing
    ? 'Назад до редагування'
    : 'Попередній перегляд';

  return (
    <>
      <Box className={classes.buttonHolder}>
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          disabled={disabled || loading}
          onClick={onPreviewClick}
        >
          {buttonText}
        </Button>
        <Button
          disabled={disabled}
          variant="contained"
          onClick={onPublishClick}
        >
          {!loading ? 'Опублікувати' : <CircularProgress size={20} />}
        </Button>
      </Box>
    </>
  );
};

export default PostCreationButtons;
