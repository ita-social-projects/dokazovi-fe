import { Quill } from 'react-quill';
import { StringMap } from 'quill';
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';
import { computerIcon } from './icons';
import { postImage } from '../../utilities/API/imgurApi';

Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const Icons: StringMap = Quill.import('ui/icons');

Icons.image = computerIcon;

export const modules: StringMap = {
  toolbar: {
    container: '#toolbar',
  },
  imageResize: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
