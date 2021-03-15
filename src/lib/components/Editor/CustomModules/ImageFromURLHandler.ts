import Quill from 'quill';

const insertFromUrl = (url: string, editor?: Quill): void => {
  if (editor && url) {
    const range = editor.getSelection(true);
    const valueObj = {
      url,
      caption: 'Введіть заголовок до фото...',
    };
    editor.insertText(range.index, '\n');
    editor.insertEmbed(range.index + 1, 'figureBlock', valueObj, 'user');
    range.index += 2;
    editor.setSelection(range, 'user');
  }
};

export default insertFromUrl;
