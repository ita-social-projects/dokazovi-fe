import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../../lib/utilities/API/api';
import { IPost } from '../../../lib/types';
import PostView from './PostView';

const PostViewContainer: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  // const [loadedPost, setLoadedPost] = useState<IPost | null>(null);

  // useEffect(() => {
  //   const getPost = async () => {
  //     const postResponse = await getPostById(Number(postId));
  //     setLoadedPost(postResponse);
  //   };
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   getPost();
  // }, []);

  return <>{/* <PostView post={loadedPost} /> */}</>;
};

export default PostViewContainer;
