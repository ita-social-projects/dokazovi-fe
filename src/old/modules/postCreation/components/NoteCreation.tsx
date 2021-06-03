import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import NoteEditorToolbar from '../../../lib/components/Editor/Editors/NoteEditorToolbar';
import { PostTypeEnum } from '../../../lib/types';
import { TextPostCreation } from './TextPostCreation';

const NoteCreation: React.FC = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <TextPostCreation
      editorToolbar={NoteEditorToolbar}
      pageTitle="Створення допису"
      titleInputLabel="Заголовок допису:"
      contentInputLabel="Текст допису:"
      postType={{ type: PostTypeEnum.DOPYS, name: 'Допис' }}
    />
  );
};

export default NoteCreation;
