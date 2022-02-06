import Quill from 'quill';
import { DropEvent, FileRejection } from 'react-dropzone';

export interface IUrlInputModalProps {
  editor?: Quill;
  updateBackgroundImage?: (url: string) => void;
  forBackgroundImg?: boolean;
}

export interface IBackgroundImageContainerProps {
  dispatchImageUrl: (backgroundImageUrl: string) => void;
  fileSelectorHandler: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
  title?: string;
  imgUrl?: string;
  notCarousel?: boolean;
  reminder?: boolean;
  forMobilePic: boolean;
}

export interface IFileInputProps {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
  forMobilePic: boolean;
}
