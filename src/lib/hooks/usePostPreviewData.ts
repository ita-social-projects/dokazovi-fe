import { useSelector } from 'react-redux';
import { IPost } from '../types';
import { RootStateType } from '../../store/rootReducer';

const usePostPreviewData = () => {
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  const post = {
    author: {
      avatar: user?.avatar,
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      mainInstitution: user?.mainInstitution,
    },
    id: 1,
    createdAt: new Date().toLocaleDateString('en-GB').split('/').join('.'),
    title: '',
  } as IPost;

  return post;
};

export default usePostPreviewData;
