import React, { useState } from 'react';
import { MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { StatusesForActions } from '../../../models/adminLab/types';
import {
  deleteAdminPost,
  setPostStatus,
  setFakeViews,
  setNewPostDate,
  selectAdminLab,
} from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { PostStatus } from '../../../old/lib/types';
import { langTokens } from '../../../locales/localizationInit';
import ActionModal, { IModalSettings } from './ActionModal';
import ActionMenu from './ActionMenu';
import ChangeViewsCountModal from './Modals/ChangeViewsCountModal';
import ChangePublicationDateModal from './Modals/ChangePublicationDateModal';

interface IActionButtons {
  id: number;
  status: string;
  title: string;
  postDate: string;
}

interface IButton {
  id: string;
  label: string;
  handler: (string) => void;
  allowedStatuses: string[];
  modal?: IModalSettings | null;
  onConfirmButtonClick?: () => void;
}

const ActionButtons: React.FC<IActionButtons> = ({
  id,
  postDate,
  status,
  title,
}) => {
  const { t } = useTranslation();
  const [
    boundedDeleteAdminPost,
    boundedSetPostStatus,
    boundedSetFakeViews,
    boundedSetNewPostDate,
  ] = useActions([
    deleteAdminPost,
    setPostStatus,
    setFakeViews,
    setNewPostDate,
  ]);

  const {
    DRAFT,
    MODERATION_FIRST_SIGN,
    MODERATION_SECOND_SIGN,
    PUBLISHED,

    ARCHIVED,
    PLANNED,
  } = PostStatus;

  const isFutureDateCheck = (date: string) => {
    const currentDate = Date.parse(new Date().toString());
    const publicationDate = Date.parse(date.split('.').reverse().join('-'));
    return currentDate < publicationDate;
  };

  const isFutureDate = isFutureDateCheck(postDate);

  const editPostLink = `/edit-post?id=${id}`;
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

  const handlerChangePublicationDate = () => {
    boundedSetNewPostDate({ id });
    if (status === PUBLISHED && isFutureDate) {
      boundedSetPostStatus({
        id,
        postStatus: StatusesForActions.PLANNED,
      });
      toast.success(t(langTokens.admin.scheduleDateSuccess));
    } else {
      boundedSetPostStatus({
        id,
        postStatus: StatusesForActions.PUBLISHED,
      });
      toast.success(t(langTokens.admin.changeDateSuccess));
    }
    closeModal();
  };

  const buttons: IButton[] = [
    {
      id: 'editBtn',
      label: t(langTokens.admin.edit),
      allowedStatuses: [PUBLISHED, MODERATION_SECOND_SIGN, ARCHIVED, PLANNED],
      modal: null,
      handler: () => {
        window.open(editPostLink);
      },
    },
    {
      id: 'returnToAuthorBtn',
      label: t(langTokens.admin.returnToAuthor),
      allowedStatuses: [MODERATION_SECOND_SIGN, PUBLISHED, ARCHIVED, PLANNED],
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.returnToAuthorTitle, { title }),
        onConfirmButtonClick: handleReturnConfirm,
      },
    },
    {
      id: 'publishBtn',
      label: t(langTokens.admin.publish),
      allowedStatuses: [MODERATION_SECOND_SIGN, ARCHIVED],
      handler: () => {
        window.open(editPostLink);
      },
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
      allowedStatuses: [MODERATION_SECOND_SIGN, ARCHIVED, PUBLISHED, PLANNED],
      // eslint-disable-next-line no-console
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.currentPublicationDate),
        content: <ChangePublicationDateModal id={id} />,
        onConfirmButtonClick: handlerChangePublicationDate,
      },
    },
    {
      id: 'changeViewsCountBtn',
      label: t(langTokens.admin.changeViewsCount),
      allowedStatuses: [PUBLISHED],
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.changeViewsCountTitle),
        content: <ChangeViewsCountModal id={id} />,
        onConfirmButtonClick: handlerSetFakeViewsConfirm,
      },
    },
    {
      id: 'archiveBtn',
      label: t(langTokens.admin.archive),
      allowedStatuses: [PUBLISHED],
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.archiveTitle),
        onConfirmButtonClick: handleArchiveConfirm,
      },
    },
    {
      id: 'deleteBtn',
      label: t(langTokens.admin.delete),
      allowedStatuses: [PUBLISHED, ARCHIVED],
      handler: (btnId) => openModal(btnId),
      modal: {
        title: t(langTokens.admin.deleteTitle),
        onConfirmButtonClick: handleDeleteConfirm,
      },
    },
    {
      id: 'set_status',
      label: t(langTokens.admin.status),
      allowedStatuses: [
        PUBLISHED,
        ARCHIVED,
        DRAFT,
        MODERATION_FIRST_SIGN,
        MODERATION_SECOND_SIGN,
      ],
      handler: () =>
        boundedSetPostStatus({
          id,
          postStatus: StatusesForActions.NEEDS_EDITING,
        }),
    },
  ];

  const buttonsRendered = buttons
    .filter((btn) => btn.allowedStatuses?.includes(status as PostStatus))
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
