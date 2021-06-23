import React from 'react';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';
import NoteEditorToolbar from '../../components/Editor/Editors/NoteEditorToolbar';
import { IPost } from '../../old/lib/types';
import { TextPostUpdation } from './TextPostUpdation';

export interface INoteUpdationProps {
  post: IPost;
}

export const NoteUpdation: React.FC<INoteUpdationProps> = ({ post }) => {
  const { t } = useTranslation();
  return (
    <TextPostUpdation
      post={post}
      editorToolbar={NoteEditorToolbar}
      pageTitle={t(langTokens.editor.postUpdation)}
      titleInputLabel={`${t(langTokens.editor.postTitle)}:`}
      contentInputLabel={`${t(langTokens.editor.postText)}:`}
    />
  );
};
