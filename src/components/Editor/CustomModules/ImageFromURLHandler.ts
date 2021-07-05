import Quill from 'quill';
import i18n, { langTokens } from '../../../locales/localizationInit';

export const insertFromUrl = (url: string, editor?: Quill): void => {
  if (editor && url) {
    const range = editor.getSelection(true);
    const valueObj = {
      url,
      caption: `${i18n.t(langTokens.editor.enterTitleForVideo)}...`,
    };
    editor.insertText(range.index, '\n');
    editor.insertEmbed(range.index + 1, 'figureBlock', valueObj, 'user');
    editor.insertText(range.index + 2, '\n');
    editor.setSelection(range.index + 3, 0, 'user');
  }
};
