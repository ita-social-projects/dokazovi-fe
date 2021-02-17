import Quill from 'quill';
import { postImage } from '../../../utilities/API/imgurApi';

const insertFromUrl = (url: string, editor?: Quill) => {
  if (editor && url) {
    const range = editor.getSelection(true);
    postImage(url)
      .then((resp) => {
        if (resp.data.data.link) {
          const valueObj = {
            url: resp.data.data.link,
            caption: 'Введіть заголовок до фото...',
          };
          editor.insertText(range.index, '\n');
          editor.insertEmbed(range.index + 1, 'figureBlock', valueObj, 'user');
          range.index += 2;
          editor.setSelection(range);
        }
      })
      .catch((e) => String(e));
  }
};

export default insertFromUrl;
