import { Quill } from 'react-quill';
import { postImage } from '../../../utilities/API/imgurApi';

const insertFromUrl = (url: string, editor?: Quill) => {
  if (editor && url) {
    const range = editor.getSelection(true);
    const deltaObj = editor.getContents();
    const id = '1007295102878769152';
    // postImage(url)
    //   .then((resp) => {
    //     if (resp.data.data.link) {
    // editor.updateContents(deltaObj).insert('<div>Hello</div>');
    editor.insertEmbed(range.index + 1, 'container', id, 'user');
    editor.insertText(range.index + 1, '<figure></figure>', 'user');
    //   editor.clipboard.dangerouslyPasteHTML(
    //     range.index,
    //     `<figure>
    //   <img src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg">
    //   <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
    // </figure>`,
    // );
    // editor.insertEmbed(
    //   range.index,
    //   'image',
    //   'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg',
    // );
    range.index += 1;
    editor.setSelection(range);
    //   }
    // })
    // .catch((e) => String(e));
  }
};

export default insertFromUrl;
