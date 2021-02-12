import Quill from 'quill';
import { postImage } from '../../../utilities/API/imgurApi';

const insertFromUrl = (url: string, editor?: Quill) => {
  if (editor && url) {
    const range = editor.getSelection(true);

    // postImage(url)
    //   .then((resp) => {
    //     if (resp.data.data.link) {
    const id = '1007295102878769152';
    editor.insertEmbed(range.index + 1, 'figureB', id, 'user');
    // editor.insertEmbed(range.index, 'image', resp.data.data.link);
    range.index += 1;
    editor.setSelection(range);

    //   }
    // })
    // .catch((e) => String(e));
  }
};

export default insertFromUrl;
