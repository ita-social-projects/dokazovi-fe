import Quill from 'quill';
import { CreatePostRequestType } from '../../../utilities/API/types';

export interface IUrlInputModalProps {
  editor?: Quill;
  updateBackgroundImage?: (url: string) => void;
}

export interface IBackgroundImageContainerProps {
  dispatchImageUrl: (backgroundImageUrl: string) => void;
  fileSelectorHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newPost?: CreatePostRequestType;
}
