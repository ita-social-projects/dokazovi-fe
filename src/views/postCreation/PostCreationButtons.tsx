import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ConfirmationModalWithButton } from '../../old/lib/components/Modals/ConfirmationModalWithButton';
import { langTokens } from '../../locales/localizationInit';
import { InformationModal } from '../../old/lib/components/Modals/InformationModal';

export interface IPostCreationButtonsProps {
  action: 'creating' | 'updating';
  onCancelClick?: () => void;
  onPublishClick: () => void;
  onPreviewClick: () => void;
  previewing?: boolean;
  disabled?: boolean;
  loading?: boolean;
  isEmpty?: boolean;
}

export const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
  action,
  onCancelClick,
  onPublishClick,
  onPreviewClick,
  previewing,
  disabled,
  loading,
  isEmpty,
}) => {
  const { t } = useTranslation();

  const cancelButtonText =
    action === 'creating'
      ? t(langTokens.editor.cancelCreation)
      : t(langTokens.editor.cancelUpdation);
  const previewButtonText = previewing
    ? t(langTokens.editor.backToUpdation)
    : t(langTokens.editor.preview);
  const publishButtonText =
    action === 'creating'
      ? t(langTokens.editor.publish)
      : t(langTokens.editor.save);

  return (
    <Box display="flex" flexDirection="row" marginTop="40px">
      {onCancelClick && (
        <ConfirmationModalWithButton
          message={`${t(langTokens.editor.wantToCancel)} ${
            action === 'creating'
              ? t(langTokens.editor.creation.toLowerCase())
              : t(langTokens.editor.updation.toLowerCase())
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

        {isEmpty ?
          <InformationModal
            message={t(langTokens.editor.requiredField)}
            buttonIcon={
              <Button
                variant="contained"
                disabled={disabled || loading}
              >
                {publishButtonText}
              </Button>
            }
          />
          :
          <Button
            variant="contained"
            disabled={disabled || loading}
            onClick={onPublishClick}
          >
            {publishButtonText}
          </Button>
        }
      </Box>
    </Box>
  );
};
