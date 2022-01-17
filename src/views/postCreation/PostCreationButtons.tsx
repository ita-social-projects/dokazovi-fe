import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ConfirmationModalWithButton } from '../../old/lib/components/Modals/ConfirmationModalWithButton';
import { langTokens } from '../../locales/localizationInit';
import { InformationModal } from '../../old/lib/components/Modals/InformationModal';
import { IPost } from '../../old/lib/types';

interface IIsModal {
  isEmpty: boolean;
  isEnoughLength: boolean;
  isVideoEmpty?: boolean;
  isTooLong?: boolean;
  hasBackGroundImg?: boolean;
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
  post?: IPost;
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
  post,
}) => {
  const { t } = useTranslation();

  const cancelButtonText =
    action === 'creating'
      ? t(langTokens.editor.cancelCreation)
      : t(langTokens.editor.cancelUpdation);
  const previewButtonText = previewing
    ? t(langTokens.editor.backToUpdation)
    : t(langTokens.editor.preview);
  const saveButtonText =
    action === 'creating'
      ? t(langTokens.editor.publish)
      : t(langTokens.editor.save);
  const publishButtonText =
    action === 'updating'
      ? t(langTokens.editor.publish)
      : t(langTokens.editor.save);

  const modalMaker = (message: string) => {
    return (
      <InformationModal
        message={message}
        buttonIcon={
          <Button variant="contained" disabled={disabled || loading}>
            {saveButtonText}
          </Button>
        }
      />
    );
  };

  const switchModalText = () => {
    switch (true) {
      case isModal?.isTooLong:
        return modalMaker(t(langTokens.editor.toMuchTitleLength));
      case isModal?.isEmpty:
        return modalMaker(t(langTokens.editor.requiredField));
      case isModal?.isEnoughLength:
        return modalMaker(t(langTokens.editor.notEnoughLength));
      case isModal?.isVideoEmpty:
        return modalMaker(t(langTokens.editor.noVideo));
      case isModal?.hasBackGroundImg:
        return modalMaker(t(langTokens.editor.noBgImg));
      default:
        return (
          <Button
            variant="contained"
            disabled={disabled || loading}
            onClick={onPublishClick}
          >
            {saveButtonText}
          </Button>
        );
    }
  };

  return (
    <Box display="flex" flexDirection="row" marginTop="40px">
      {onCancelClick && (
        <ConfirmationModalWithButton
          message={`${t(langTokens.editor.wantToCancel)} ${
            action === 'updating'
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

      <Box display="flex" flexDirection="row" marginLeft="10px">
        {action === 'updating' &&
        (post?.status === 'ARCHIVED' ||
          post?.status === 'PLANNED' ||
          post?.status === 'MODERATION_SECOND_SIGN') ? (
          <Button
            style={{ marginRight: '10px' }}
            variant="outlined"
            disabled={disabled || loading}
            onClick={onPublishClick}
          >
            {publishButtonText}
          </Button>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};
