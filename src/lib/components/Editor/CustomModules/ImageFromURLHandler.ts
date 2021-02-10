import { Quill } from 'react-quill';
import { postImage } from '../../../utilities/API/imgurApi';

const insertFromUrl = (url: string, editor?: Quill) => {
  if (editor && url) {
    const range = editor.getSelection(true);

    postImage(url)
      .then((resp) => {
        if (resp.data.data.link) {
          editor.insertEmbed(range.index, 'image', resp.data.data.link);
          range.index += 1;
          editor.setSelection(range);
        }
      })
      .catch((e) => String(e));
  }
};

export default insertFromUrl;
