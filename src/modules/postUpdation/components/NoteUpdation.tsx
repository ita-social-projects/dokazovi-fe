import React from 'react';
import NoteEditorToolbar from '../../../lib/components/Editor/Editors/NoteEditorToolbar';
import { IPost } from '../../../lib/types';
import { TextPostUpdation } from './TextPostUpdation';

export interface INoteUpdationProps {
  post: IPost;
}

export const NoteUpdation: React.FC<INoteUpdationProps> = ({ post }) => {
  return (
    <TextPostUpdation
      post={post}
      editorToolbar={NoteEditorToolbar}
      pageTitle="Редагування допису"
      titleInputLabel="Заголовок допису:"
      contentInputLabel="Текст допису:"
    />
  );
};
