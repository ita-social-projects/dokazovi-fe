import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useStyles } from '../../styles/PostCreationButtons.styles';

export interface IPostCreationButtonsProps {
  goPreview: () => void;
  currentPostType?: string;
}

const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
  goPreview,
  currentPostType,
}) => {
  const classes = useStyles();
  const buttonText = currentPostType
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
        <Button variant="contained">Опублікувати</Button>
      </Box>
    </>
  );
};

export default PostCreationButtons;
