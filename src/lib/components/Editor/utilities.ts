/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Quill } from 'react-quill';
import { StringMap } from 'quill';
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';
import { computerIcon } from './icons';
import { postImage } from '../../utilities/API/imgurApi';

const Block = Quill.import('blots/block');
const BlockEmbed = Quill.import('blots/block/embed');
class FigureBlot extends BlockEmbed {
  static create(id) {
    const node = super.create();
    node.dataset.id = id;
    // twttr.widgets.createTweet(id, node);
    return node;
  }

  static value(domNode) {
    return domNode.dataset.id;
  }
}
FigureBlot.blotName = 'figureB';
FigureBlot.tagName = 'DIV';
// Block.tagName = 'IMG';
// Quill.register(Block, true);
Quill.register({ 'blots/figureB': FigureBlot });
Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);

const Icons: StringMap = Quill.import('ui/icons');

Icons.image = computerIcon;

export const modules: StringMap = {
  toolbar: {
    container: '#toolbar',
  },
  imageResize: {
    parchment: Quill.import('parchment'),
  },

  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        postImage(file)
          .then((resp) => {
            resolve(resp.data.data.link);
          })
          .catch((error) => {
            reject(error);
            console.error('Error:', error);
          });
      });
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

export const formats: string[] = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'clean',
];
