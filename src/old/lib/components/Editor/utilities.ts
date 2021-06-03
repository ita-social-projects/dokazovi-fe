/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Disable required to allow using Quill register method
import Quill, { StringMap } from 'quill';
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';
// import MagicUrl from 'quill-magic-url';
import { computerIcon } from './icons';
import FigureBlot from './Blots/FigureBlot';
import InsertFromFile from './CustomModules/ImageFromFileHandler';
import { uploadImageToImgur } from '../../utilities/Imgur/uploadImageToImgur';

// Quill.register('modules/magicUrl', MagicUrl);
Quill.register({ 'blots/figureBlock': FigureBlot });
Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/insertFromFile', InsertFromFile);

const Font = Quill.import('formats/font');
Font.whitelist = ['raleway', 'literata'];
Quill.register(Font, true);

const Icons: StringMap = Quill.import('ui/icons');

Icons.image = computerIcon;

export const modules: StringMap = {
  toolbar: {
    container: '#toolbar',
  },
  imageResize: {
    modules: ['Resize', 'DisplaySize'],
  },
  // insertFromFile: {
  //   upload: (file: string | Blob): Promise<unknown> => {
  //     return new Promise((resolve, reject) => {
  //       resolve(file);
  //       reject(new Error('Failed image upload'));
  //     });
  //   },
  // },
  insertFromFile: {
    upload: (file: string | Blob): Promise<unknown> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onload = () => {
          const image = reader.result as string;
          const result = image.slice(image.search(/[^,]*$/));
          resolve(result);
          reject(new Error('Failed image onload'));
        };
      })
        .then((str) => uploadImageToImgur(str as string))
        .then((res) => {
          return res.data.data.link;
        })
        .catch((err) => console.log(err));
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  // magicUrl: true,
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
