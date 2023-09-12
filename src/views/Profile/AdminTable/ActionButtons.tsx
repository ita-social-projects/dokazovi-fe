import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { StatusesForActions } from '../../../models/adminLab/types';
import {
  deleteAdminPost,
  setPostStatus,
  setFakeViews,
} from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { PostStatus } from '../../../old/lib/types';
import { langTokens } from '../../../locales/localizationInit';
import ActionModal, { IModalSettings } from './ActionModal';
import ActionMenu from './ActionMenu';
import ChangeViewsCountModal from './Modals/ChangeViewsCountModal';
import SetPublicationDateModal from './Modals/SetPublicationDateModal';

interface IActionButtons {
  id: number;
  status: string;
  title: string;
  isAdmin: boolean | undefined;
}

interface IButton {
  id: string;
  label: string;
  handler: (string) => void;
  modal?: IModalSettings | null;
  onConfirmButtonClick?: () => void;
  adminUseStatuses: string[];
  authorUseStatuses: string[];
}

const ActionButtons: React.FC<IActionButtons> = ({
  id,
  status,
  title,
  isAdmin,
}) => {
  const { t } = useTranslation();
  const [
    boundedDeleteAdminPost,
    boundedSetPostStatus,
    boundedSetFakeViews,
  ] = useActions([deleteAdminPost, setPostStatus, setFakeViews]);

  const {
    DRAFT,
    // MODERATION_FIRST_SIGN,
    MODERATION_SECOND_SIGN,
    PUBLISHED,
    PLANNED,
    ARCHIVED,
    NEEDS_EDITING,
  } = PostStatus;

  const editPostLink = `/edit-post?id=${id}`;
  const history = useHistory();
  const [activeModal, setActiveModal] = useState<null | string>(null);

  const openModal = (modal: string) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
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

  const handlePublishConfirm = () => {
    boundedSetPostStatus({
      id,
      postStatus: StatusesForActions.PUBLISHED,
    });
    toast.success(t(langTokens.admin.publishSuccess));
    closeModal();
  };

  const handleSendToReviewConfirm = () => {
    boundedSetPostStatus({
      id,
      postStatus: StatusesForActions.MODERATION_SECOND_SIGN,
    });
    toast.success(t(langTokens.admin.sendForReviewSuccess));
    closeModal();
  };

  const handleReturnConfirm = () => {
    boundedSetPostStatus({
      id,
      postStatus: StatusesForActions.NEEDS_EDITING,
    });
    toast.success(t(langTokens.admin.returnSuccess));
    closeModal();
  };

  const handlerSetFakeViewsConfirm = () => {
    boundedSetFakeViews({ id });
    toast.success(t(langTokens.admin.changeViewsCountSuccess));
    closeModal();
  };

  const handlerSchedulePublish = () => {
    boundedSetPostStatus({
      id,
      postStatus: StatusesForActions.PLANNED,
    });
    toast.success(t(langTokens.admin.scheduleDateSuccess));
    closeModal();
  };

  const buttons: IButton[] = [
    {
      id: 'editBtn',
      label: t(langTokens.admin.edit),
      modal: null,
      handler: () => {
        history.push(editPostLink);
      },
      adminUseStatuses: [
        PUBLISHED,
        MODERATION_SECOND_SIGN,
        ARCHIVED,
        DRAFT,
        PLANNED,
      ],
      authorUseStatuses: [DRAFT, NEEDS_EDITING],
    },
    {
      id: 'returnToAuthorBtn',
      label: t(langTokens.admin.returnToAuthor),
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.returnToAuthorTitle, { title }),
        onConfirmButtonClick: handleReturnConfirm,
      },
      adminUseStatuses: [PUBLISHED, MODERATION_SECOND_SIGN, ARCHIVED, PLANNED],
      authorUseStatuses: [],
    },
    {
      id: 'publishBtn',
      label: t(langTokens.admin.publish),
      // handler: () => {
      //   window.open(editPostLink);
      // },
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.publishTitle),
        onConfirmButtonClick: handlePublishConfirm,
      },
      adminUseStatuses: [MODERATION_SECOND_SIGN, ARCHIVED, PLANNED],
      authorUseStatuses: [],
    },
    {
      id: 'sentToModerationBtn',
      label: t(langTokens.admin.sendForReview),
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.sendForReviewTitle),
        onConfirmButtonClick: handleSendToReviewConfirm,
      },
      adminUseStatuses: [],
      authorUseStatuses: [DRAFT, NEEDS_EDITING],
    },
    {
      id: 'schedulePublishBtn',
      label: t(langTokens.admin.schedulePublish),
      // eslint-disable-next-line no-console
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.schedulePublishTitle),
        content: <SetPublicationDateModal id={id} />,
        onConfirmButtonClick: handlerSchedulePublish,
      },
      adminUseStatuses: [MODERATION_SECOND_SIGN, ARCHIVED],
      authorUseStatuses: [],
    },
    {
      id: 'changePublicationDateBtn',
      label: t(langTokens.admin.changePublicationDate),
      // eslint-disable-next-line no-console
      handler: () => console.log('changePublicationDateBtn handler'),
      modal: null,
      adminUseStatuses: [PLANNED],
      authorUseStatuses: [],
    },
    {
      id: 'changeViewsCountBtn',
      label: t(langTokens.admin.changeViewsCount),
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.changeViewsCountTitle),
        content: <ChangeViewsCountModal id={id} />,
        onConfirmButtonClick: handlerSetFakeViewsConfirm,
      },
      adminUseStatuses: [PUBLISHED],
      authorUseStatuses: [],
    },
    {
      id: 'archiveBtn',
      label: t(langTokens.admin.archive),
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.archiveTitle),
        onConfirmButtonClick: handleArchiveConfirm,
      },
      adminUseStatuses: [PUBLISHED],
      authorUseStatuses: [],
    },
    {
      id: 'deleteBtn',
      label: t(langTokens.admin.delete),
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.deleteTitle),
        onConfirmButtonClick: handleDeleteConfirm,
      },
      adminUseStatuses: [PUBLISHED, ARCHIVED, PLANNED, DRAFT],
      authorUseStatuses: [DRAFT, NEEDS_EDITING],
    },
  ];

  const buttonsRendered = buttons
    .filter((btn) =>
      (isAdmin ? btn.adminUseStatuses : btn.authorUseStatuses).includes(
        status as PostStatus,
      ),
    )
    .map((btn) => (
      <MenuItem key={btn.label} onClick={() => handleButtonClick(btn)}>
        {btn.label}
      </MenuItem>
    ));

  const activeBtn = buttons.find((el) => el.id === activeModal);
  return buttonsRendered.length > 0 ? (
    <>
      <ActionMenu buttonsRendered={buttonsRendered} />
      {activeBtn?.modal && (
        <ActionModal
          open={!!activeModal}
          onClose={closeModal}
          modal={activeBtn.modal}
        />
      )}
    </>
  ) : (
    <></>
  );
};

export default ActionButtons;
