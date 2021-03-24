import React from 'react';
import { Box, Button } from '@material-ui/core';
import { ConfirmationModalWithButton } from '../../../lib/components/Modals/ConfirmationModalWithButton';

export interface IPostCreationButtonsProps {
  action: 'creating' | 'updating';
  onCancelClick: () => void;
  onPublishClick: () => void;
  onPreviewClick: () => void;
  previewing?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
  action,
  onCancelClick,
  onPublishClick,
  onPreviewClick,
  previewing,
  disabled,
  loading,
}) => {
  const cancelButtonText =
    action === 'creating' ? 'Відмінити створення' : 'Відмінити редагування';
  const previewButtonText = previewing
    ? 'Назад до редагування'
    : 'Попередній перегляд';

  return (
    <Box display="flex" flexDirection="row" marginTop="40px">
      <ConfirmationModalWithButton
        message={`Ви дійсно бажаєте відмінити ${
          action === 'creating' ? 'створення' : 'редагування'
        }?`}
        buttonText={cancelButtonText}
        onConfirmButtonClick={onCancelClick}
        disabled={disabled}
        loading={loading}
      />

      <Box display="flex" flexDirection="row" marginLeft="auto">
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          disabled={disabled || loading}
          onClick={onPreviewClick}
        >
          {previewButtonText}
        </Button>

        <ConfirmationModalWithButton
          message={`Ви дійсно бажаєте ${
            action === 'creating' ? 'опублікувати' : 'зберегти'
          } цей матеріал?`}
          buttonText={action === 'creating' ? 'Опублікувати' : 'Зберегти'}
          onConfirmButtonClick={onPublishClick}
          disabled={disabled}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default PostCreationButtons;
