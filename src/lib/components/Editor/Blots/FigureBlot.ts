/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Disables required to create new Quill Blot
import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class FigureBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    const img = document.createElement('img');
    img.setAttribute('src', value.url);
    const caption = document.createElement('figcaption');
    caption.setAttribute('align', 'left');
    caption.setAttribute('contenteditable', 'true');
    caption.classList.add('imageTitle');
    caption.innerHTML = value.caption;
    node.appendChild(img);
    node.appendChild(caption);
    return node;
  }

  static value(domNode) {
    const imageElement = domNode.querySelector('img');
    const captionElement = domNode.querySelector('figcaption');
    const url = imageElement.getAttribute('src');
    const caption = captionElement.innerHTML;
    return { url, caption };
  }
}

FigureBlot.blotName = 'figureBlock';
FigureBlot.tagName = 'FIGURE';

export default FigureBlot;
