import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ConfirmationModalWithButton } from '../../old/lib/components/Modals/ConfirmationModalWithButton';
import { langTokens } from '../../locales/localizationInit';
import { InformationModal } from '../../old/lib/components/Modals/InformationModal';

interface IIsModal {
  isEmpty: boolean;
  isEnoughLength: boolean;
  isVideoEmpty?:boolean;
}

export interface IPostCreationButtonsProps {
  action: 'creating' | 'updating';
  onCancelClick?: () => void;
  onPublishClick: () => void;
  onPreviewClick: () => void;
  previewing?: boolean;
  disabled?: boolean;
  loading?: boolean;
  isModal?: IIsModal;
}

export const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
  action,
  onCancelClick,
  onPublishClick,
  onPreviewClick,
  previewing,
  disabled,
  loading,
  isModal,
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

  const modalMaker = (message: string) => {
    return (
      <InformationModal
        message={message}
        buttonIcon={
          <Button variant="contained" disabled={disabled || loading}>
            {publishButtonText}
          </Button>
        }
      />
    );
  };

  const switchModalText = () => {
    switch (true) {
      case isModal?.isEmpty:
        return modalMaker(t(langTokens.editor.requiredField));
      case isModal?.isEnoughLength:
        return modalMaker(t(langTokens.editor.notEnoughLength));
      case isModal?.isVideoEmpty:
        return modalMaker(t(langTokens.editor.noVideo));
      default:
        return (
          <Button
            variant="contained"
            disabled={disabled || loading}
            onClick={onPublishClick}
          >
            {publishButtonText}
          </Button>
        );
    }
  };

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

        {switchModalText()}
      </Box>
    </Box>
  );
};
