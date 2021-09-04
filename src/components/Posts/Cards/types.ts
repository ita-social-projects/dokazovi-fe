import { IPost } from '../../../old/lib/types';

export interface IPostPreviewCardProps {
  post: IPost;
  size?: 'small' | 'large' | 'mobile';
  shouldNotUseLink?: boolean;
  resetPage?: () => void;
}
