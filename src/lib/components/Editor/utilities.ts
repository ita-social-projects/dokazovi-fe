/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Disable required to allow using Quill register method
import Quill, { StringMap } from 'quill';
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';
import { computerIcon } from './icons';
import { postImage } from '../../utilities/API/imgurApi';
import FigureBlot from './Blots/FigureBlot';
import InsertFromFile from './CustomModules/ImageFromFileHandler';

Quill.register({ 'blots/figureBlock': FigureBlot });
Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/insertFromFile', InsertFromFile);

const Icons: StringMap = Quill.import('ui/icons');

Icons.image = computerIcon;

export const modules: StringMap = {
  toolbar: {
    container: '#toolbar',
  },
  imageResize: {
    parchment: Quill.import('parchment'),
  },
  insertFromFile: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        // postImageFetch(file)
        //   .then((resp) => {
        //     console.log(resp);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        resolve(`https://i.imgur.com/BBcy6Wc.jpg`);
        // })
        // .catch((error) => {
        //   reject(error);
        //   console.error('Error:', error);
        // });
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
  'figureBlock',
];
