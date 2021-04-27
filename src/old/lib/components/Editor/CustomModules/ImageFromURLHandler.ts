import Quill from 'quill';

export const insertFromUrl = (url: string, editor?: Quill): void => {
  if (editor && url) {
    const range = editor.getSelection(true);
    const valueObj = {
      url,
      caption: 'Введіть заголовок до фото...',
    };
    editor.insertText(range.index, '\n');
    editor.insertEmbed(range.index + 1, 'figureBlock', valueObj, 'user');
    editor.insertText(range.index + 2, '\n');
    editor.setSelection(range.index + 3, 0, 'user');
  }
};
