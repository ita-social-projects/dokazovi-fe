import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from '../../../lib/components/Carousel';
import { PostCard } from '../../../lib/components/PostCard';
import { RootState } from '../../../store/rootReducer';
import { fetchImportantPosts } from '../store/mainSlice';

const ImportantContainer: React.FC = () => {
  const posts = useSelector((state: RootState) => state.main.important);
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
    </div>
  );
};

export default ImportantContainer;
