import React, { useState } from 'react';
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
  onSaveClick: () => void;
  previewing?: boolean;
  disabled?: boolean;
  loading?: boolean;
  isModal?: IIsModal;
  isAdmin?: boolean;
  post?: IPost;
}

export const PostCreationButtons: React.FC<IPostCreationButtonsProps> = ({
  action,
  onCancelClick,
  onPublishClick,
  onPreviewClick,
  onSaveClick,
  previewing,
  disabled,
  loading,
  isModal,
  isAdmin,
  post,
}) => {
  const { t } = useTranslation();
  const [modalMessage, setModalMessage] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const cancelButtonText =
    action === 'creating'
      ? t(langTokens.editor.cancelCreation)
      : t(langTokens.editor.cancelUpdation);
  const previewButtonText = previewing
    ? t(langTokens.editor.backToUpdation)
    : t(langTokens.editor.preview);
  const saveButtonText = t(langTokens.editor.save);
  const publishButtonText = isAdmin
    ? t(langTokens.editor.publish)
    : t(langTokens.editor.sendToReview);

  const modalMaker = (message: string) => {
    setModalMessage(message);
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  const switchPublishModalText = () => {
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
        return onPublishClick();
    }
  };

  const switchSaveModalText = () => {
    if (isModal?.isEmpty) {
      return modalMaker(t(langTokens.editor.requiredField));
    }
    return onSaveClick();
  };

  return (
    <Box display="flex" flexDirection="row" marginTop="40px">
      {onCancelClick && (
        <ConfirmationModalWithButton
          message={`${t(langTokens.editor.wantToCancel)} ${
            action === 'updating'
              ? t(langTokens.editor.updation.toLowerCase())
              : t(langTokens.editor.creation.toLowerCase())
          }?`}
          buttonText={cancelButtonText}
          onConfirmButtonClick={onCancelClick}
          disabled={loading || false}
          loading={loading}
        />
      )}

      <Box display="flex" flexDirection="row" marginLeft="auto">
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          disabled={loading || false}
          onClick={onPreviewClick}
        >
          {previewButtonText}
        </Button>
        <Button
          variant="contained"
          disabled={disabled || loading}
          onClick={switchSaveModalText}
        >
          {saveButtonText}
        </Button>
      </Box>

      <Box display="flex" flexDirection="row" marginLeft="10px">
        {(isAdmin &&
          action === 'updating' &&
          (post?.status === 'ARCHIVED' ||
            post?.status === 'PLANNED' ||
            post?.status === 'MODERATION_SECOND_SIGN' ||
            post?.status === 'DRAFT')) ||
        (isAdmin === false &&
          action === 'updating' &&
          (post?.status === 'DRAFT' || post?.status === 'NEEDS_EDITING')) ||
        action === 'creating' ? (
          <Button
            style={{ marginRight: '10px' }}
            variant="outlined"
            disabled={loading || false}
            onClick={switchPublishModalText}
          >
            {publishButtonText}
          </Button>
        ) : (
          ''
        )}
      </Box>
      {openModal && (
        <InformationModal
          onClose={onModalClose}
          message={modalMessage}
          isOpen={openModal}
        />
      )}
    </Box>
  );
};
