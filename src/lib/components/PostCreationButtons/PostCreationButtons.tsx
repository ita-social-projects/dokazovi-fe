import React from 'react';
import { Box, Button } from '@material-ui/core';

export interface IPostCreationButtonsProps {
  goPreview: () => void;
}

const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
  goPreview,
}) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        style={{
          marginLeft: '14px',
          marginRight: '14px',
          marginTop: '10px',
          padding: '10px',
        }}
      >
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          onClick={goPreview}
        >
          Попередній перегляд
        </Button>
        <Button variant="contained">Опублікувати</Button>
      </Box>
    </>
  );
};

export default PostCreationButtons;
