import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BorderBottom from '../../../lib/components/Border';
import Carousel from '../../../lib/components/Carousel';
import { PostCard } from '../../../lib/components/PostCard';
import { RootStateType } from '../../../store/rootReducer';
import { fetchImportantPosts } from '../store/mainSlice';

const ImportantContainer: React.FC = () => {
  const posts = useSelector((state: RootStateType) => state.main.important);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImportantPosts());
  }, []);

  return (
    <div>
      <Carousel>
        {posts.map((p) => (
          <div key={p.title}>
            <PostCard post={p} />
          </div>
        ))}
      </Carousel>
      <BorderBottom />
    </div>
  );
};

export default ImportantContainer;
