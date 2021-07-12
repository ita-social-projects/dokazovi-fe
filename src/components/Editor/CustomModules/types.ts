import Quill from 'quill';
import { Dispatch, SetStateAction } from 'react';

export interface IUrlInputModalProps {
  editor?: Quill;
  updateBackgroundImage?: (url: string) => void;
  handleDelete?: Dispatch<SetStateAction<FileList | null>> | undefined;
}

export interface IBackgroundImageContainerProps {
  dispatchImageUrl: (backgroundImageUrl: string) => void;
  fileSelectorHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  imgUrl?: string;
  notCarousel?: boolean;
}

export interface IFileInputProps {
  files?: FileList | null;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
