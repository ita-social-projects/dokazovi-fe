/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Quill, { RangeStatic } from 'quill';
import FigureBlot from '../Blots/FigureBlot';

export interface IUploadImageValue {
  url: string | ArrayBuffer | null;
  caption: string;
}

export interface IUploadFunc {
  upload: (file: string) => Promise<string>;
}

class InsertFromFile {
  quill: Quill;

  range: RangeStatic | null;

  options: IUploadFunc;

  figureObj: IUploadImageValue;

  fileHolder: HTMLInputElement;

  constructor(quill: Quill, options: IUploadFunc) {
    this.quill = quill;
    this.options = options;
    this.range = null;
    this.figureObj = {
      url: '',
      caption: 'Введіть заголовок до фото...',
    };
    this.fileHolder = document.createElement('input');

    if (typeof this.options.upload !== 'function')
      console.warn(
        '[Missing config] upload function that returns a promise is required',
      );

    const toolbar = this.quill.getModule('toolbar');
    toolbar.addHandler('image', this.selectLocalImage.bind(this));

    this.handleDrop = this.handleDrop.bind(this);
    this.handlePaste = this.handlePaste.bind(this);

    this.quill.root.addEventListener('drop', this.handleDrop.bind(this), false);
    this.quill.root.addEventListener(
      'paste',
      this.handlePaste.bind(this),
      false,
    );
  }

  selectLocalImage() {
    this.range = this.quill.getSelection();
    this.fileHolder = document.createElement('input');
    this.fileHolder.setAttribute('type', 'file');
    this.fileHolder.setAttribute('accept', 'image/*');
    this.fileHolder.setAttribute('style', 'visibility:hidden');

    this.fileHolder.onchange = this.fileChanged.bind(this);

    document.body.appendChild(this.fileHolder);

    this.fileHolder.click();

    window.requestAnimationFrame(() => {
      document.body.removeChild(this.fileHolder);
    });
  }

  handleDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (
      evt.dataTransfer &&
      evt.dataTransfer.files &&
      evt.dataTransfer.files.length
    ) {
      if (document.caretRangeFromPoint) {
        const selection = document.getSelection();
        const range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
        if (selection && range) {
          selection.setBaseAndExtent(
            range.startContainer,
            range.startOffset,
            range.startContainer,
            range.startOffset,
          );
        }
      } else {
        const selection = document.getSelection();
        const range = document.caretPositionFromPoint(evt.clientX, evt.clientY);
        if (selection && range) {
          selection.setBaseAndExtent(
            range.offsetNode,
            range.offset,
            range.offsetNode,
            range.offset,
          );
        }
      }

      this.range = this.quill.getSelection();
      const file = evt.dataTransfer.files[0];

      setTimeout(() => {
        this.range = this.quill.getSelection();
        this.readAndUploadFile(file);
      }, 0);
    }
  }

  handlePaste(evt) {
    const clipboard = evt.clipboardData;

    // IE 11 is .files other browsers are .items
    if (clipboard && (clipboard.items || clipboard.files)) {
      const items = clipboard.items || clipboard.files;
      const IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png|svg|webp)$/i;

      for (let i = 0; i < items.length; i += 1) {
        if (IMAGE_MIME_REGEX.test(items[i].type)) {
          const file = items[i].getAsFile ? items[i].getAsFile() : items[i];

          if (file) {
            this.range = this.quill.getSelection();
            evt.preventDefault();
            setTimeout(() => {
              this.range = this.quill.getSelection();
              this.readAndUploadFile(file);
            }, 0);
          }
        }
      }
    }
  }

  readAndUploadFile(file) {
    let isUploadReject = false;

    const fileReader = new FileReader();

    fileReader.addEventListener(
      'load',
      () => {
        if (!isUploadReject) {
          const base64ImageSrc = fileReader.result;
          if (typeof base64ImageSrc === 'string') {
            // this.insertBase64Image(base64ImageSrc);
          }
        }
      },
      false,
    );

    if (file) {
      fileReader.readAsDataURL(file);
    }

    this.options.upload(file).then(
      (imageUrl) => {
        this.insertToEditor(imageUrl);
      },
      (error) => {
        isUploadReject = true;
        this.removeBase64Image();
        console.warn(error);
      },
    );
  }

  fileChanged() {
    if (this.fileHolder.files !== null) {
      const file = this.fileHolder.files[0];
      this.readAndUploadFile(file);
    }
  }

  // insertBase64Image(url: string) {
  //   console.log('We are in insertBase64');

  //   const { range } = this;
  //   if (range !== null) {
  //     this.quill.insertEmbed(
  //       range.index,
  //       FigureBlot.blotName,
  //       (this.figureObj.url = url),
  //       'user',
  //     );
  //   }
  // }

  insertToEditor(url: string) {
    const { range, figureObj } = this;
    figureObj.url = url;
    if (range !== null) {
      this.quill.insertText(range.index, '\n');
      this.quill.insertEmbed(range.index + 1, 'figureBlock', figureObj, 'user');

      range.index += 2;
      this.quill.setSelection(range, 'user');
    }
  }

  removeBase64Image() {
    const { range } = this;
    if (range !== null) {
      this.quill.deleteText(range.index, 3, 'user');
    }
  }
}

export default InsertFromFile;
