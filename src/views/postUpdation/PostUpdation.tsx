import React from 'react';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';

import { IPost } from '../../old/lib/types';
import { AllPostTypesUpdation } from './AllPostTypesUpdation';

export interface IPostUpdationProps {
  post: IPost;
}

export const PostUpdation: React.FC<IPostUpdationProps> = ({ post }) => {
  const { t } = useTranslation();

  const postLabels = [
    {
      type: 1,
      pageTitle: t(langTokens.editor.articleUpdation),
      titleInputLabel: `${t(langTokens.editor.articleTitle)}:`,
      contentInputLabel: `${t(langTokens.editor.articleText)}:`,
    },
    {
      type: 2,
      pageTitle: t(langTokens.editor.videoUpdation),
      titleInputLabel: `${t(langTokens.editor.videoTitle)}:`,
      contentInputLabel: `${t(langTokens.editor.videoDescription)}:`,
    },
    {
      type: 3,
      pageTitle: t(langTokens.editor.noteUpdation),
      titleInputLabel: `${t(langTokens.editor.noteTitle)}:`,
      contentInputLabel: `${t(langTokens.editor.noteText)}:`,
    },
  ];

  const currentPostLabels = postLabels.filter(
    (labels) => labels.type === post.type.id,
  )[0];

  return (
    <AllPostTypesUpdation
      post={post}
      pageTitle={currentPostLabels.pageTitle}
      titleInputLabel={currentPostLabels.titleInputLabel}
      contentInputLabel={currentPostLabels.contentInputLabel}
    />
  );
};
