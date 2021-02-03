import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useStyles } from '../../styles/PostCreationButtons.styles';

export interface IPostCreationButtonsProps {
  publishPost: () => void;
  goPreview: () => void;
  isOnPreview?: boolean;
}

const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
  publishPost,
  goPreview,
  isOnPreview,
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
          onClick={goPreview}
        >
          {buttonText}
        </Button>
        <Button variant="contained" onClick={publishPost}>
          Опублікувати
        </Button>
      </Box>
    </>
  );
};

export default PostCreationButtons;
