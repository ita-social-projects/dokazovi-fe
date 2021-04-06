import React from 'react';
import { Box, Button } from '@material-ui/core';
import { ConfirmationModalWithButton } from '../../../lib/components/Modals/ConfirmationModalWithButton';

export interface IPostCreationButtonsProps {
  action: 'creating' | 'updating';
  onCancelClick?: () => void;
  onPublishClick: () => void;
  onPreviewClick: () => void;
  previewing?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
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
  const publishButtonText = action === 'creating' ? 'Опублікувати' : 'Зберегти';

  return (
    <Box display="flex" flexDirection="row" marginTop="40px">
      {onCancelClick && (
        <ConfirmationModalWithButton
          message={`Ви дійсно бажаєте відмінити ${
            action === 'creating' ? 'створення' : 'редагування'
          }?`}
          buttonText={cancelButtonText}
          onConfirmButtonClick={onCancelClick}
          disabled={disabled}
          loading={loading}
        />
      )}

      <Box display="flex" flexDirection="row" marginLeft="auto">
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          disabled={disabled || loading}
          onClick={onPreviewClick}
        >
          {previewButtonText}
        </Button>

        <Button
          variant="contained"
          disabled={disabled || loading}
          onClick={onPublishClick}
        >
          {publishButtonText}
        </Button>
      </Box>
    </Box>
  );
};
