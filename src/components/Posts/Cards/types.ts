import { IPost } from '../../../old/lib/types';

export interface IPostPreviewCardProps {
  post: IPost;
  size?: 'small' | 'large';
  shouldNotUseLink?: boolean;
}
