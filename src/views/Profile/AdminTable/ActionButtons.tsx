import React, { useState } from 'react';
import { MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { StatusesForActions } from '../../../models/adminLab/types';
import { deleteAdminPost, setPostStatus } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { PostStatus } from '../../../old/lib/types';
import { langTokens } from '../../../locales/localizationInit';
import ActionButtonsModal, { IModalSettings } from './ActionButtonsModal';
import ActionButtonsMenu from './ActionButtonsMenu';

interface IActionButtons {
  id: number;
  status: string;
  title: string;
}

interface IButton {
  id: string;
  label: string;
  handler: (string) => void;
  allowedStatuses: string[];
  modal?: IModalSettings | null;
  onConfirmButtonClick?: () => void;
}

const ActionButtons: React.FC<IActionButtons> = ({ id, status, title }) => {
  const { t } = useTranslation();
  const [boundedDeleteAdminPost, boundedSetPostStatus] = useActions([
    deleteAdminPost,
    setPostStatus,
  ]);

  const {
    DRAFT,
    MODERATION_FIRST_SIGN,
    MODERATION_SECOND_SIGN,
    PUBLISHED,
    ARCHIVED,
  } = PostStatus;

  const editPostLink = `/edit-post?id=${id}`;
  const [currentActiveModal, setCurrentActiveModal] = useState<null | string>(
    null,
  );

  const openModal = (modal: string) => {
    setCurrentActiveModal(modal);
  };

  const closeModal = () => {
    setCurrentActiveModal(null);
  };

  const handleButtonClick = (btn: IButton) => {
    const { id: btnId, handler } = btn;
    handler(btnId);
  };

  const handleDeleteConfirm = () => {
    boundedDeleteAdminPost({ id });
    toast.success(t(langTokens.admin.deleteSuccess));
    closeModal();
  };

  const handleArchiveConfirm = () => {
    boundedSetPostStatus({
      id,
      postStatus: StatusesForActions.ARCHIVED,
    });
    toast.success(t(langTokens.admin.archiveSuccess));
    closeModal();
  };

  const buttons: IButton[] = [
    {
      id: 'editBtn',
      label: t(langTokens.admin.edit),
      allowedStatuses: [PUBLISHED, MODERATION_SECOND_SIGN, ARCHIVED],
      modal: null,
      handler: () => {
        window.open(editPostLink);
      },
    },
    {
      id: 'returnToAuthorBtn',
      label: t(langTokens.admin.returnToAuthor),
      allowedStatuses: [MODERATION_SECOND_SIGN, PUBLISHED, ARCHIVED],
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.returnToAuthorTitle, { title }),
        onConfirmButtonClick: () => {
          // handleSetPostStatus(id, StatusesForActions.?????);
          toast.error('no such functionality so far');
          closeModal();
        },
      },
    },
    {
      id: 'publishBtn',
      label: t(langTokens.admin.publish),
      allowedStatuses: [MODERATION_SECOND_SIGN, ARCHIVED],
      // eslint-disable-next-line no-console
      handler: () => console.log('publishBtn handler'),
      modal: null,
    },
    {
      id: 'schedulePublishBtn',
      label: t(langTokens.admin.schedulePublish),
      allowedStatuses: [MODERATION_SECOND_SIGN, ARCHIVED],
      // eslint-disable-next-line no-console
      handler: () => console.log('schedulePublishBtn handler'),
      modal: null,
    },
    {
      id: 'changePublicationDateBtn',
      label: t(langTokens.admin.changePublicationDate),
      allowedStatuses: [],
      // eslint-disable-next-line no-console
      handler: () => console.log('changePublicationDateBtn handler'),
      modal: null,
    },
    {
      id: 'changeViewsCountBtn',
      label: t(langTokens.admin.changeViewsCount),
      allowedStatuses: [PUBLISHED],
      // eslint-disable-next-line no-console
      handler: () => console.log('changeViewsCountBtn handler'),
      modal: null,
    },
    {
      id: 'archiveBtn',
      label: t(langTokens.admin.archive),
      allowedStatuses: [PUBLISHED],
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.archiveTitle),
        onConfirmButtonClick: () => handleArchiveConfirm(),
      },
    },
    {
      id: 'deleteBtn',
      label: t(langTokens.admin.delete),
      allowedStatuses: [PUBLISHED, ARCHIVED],
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.deleteTitle),
        onConfirmButtonClick: () => handleDeleteConfirm(),
      },
    },
  ];

  const buttonsRendered = buttons
    .filter((btn) => btn.allowedStatuses?.includes(status as PostStatus))
    .map((btn) => (
      <MenuItem key={btn.label} onClick={() => handleButtonClick(btn)}>
        {btn.label}
      </MenuItem>
    ));

  const renderModal = (btnId: string) => {
    const btn = buttons.find((el) => el.id === btnId);
    return (
      btn?.modal && (
        <ActionButtonsModal
          open={!!currentActiveModal}
          onClose={() => setCurrentActiveModal(null)}
          modal={btn.modal}
        />
      )
    );
  };

  return buttonsRendered.length > 0 ? (
    <>
      <ActionButtonsMenu buttonsRendered={buttonsRendered} />
      {currentActiveModal && renderModal(currentActiveModal)}
    </>
  ) : (
    <></>
  );
};

export default ActionButtons;
