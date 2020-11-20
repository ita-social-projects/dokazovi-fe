import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BorderBottom from '../../../lib/components/Border';
import Carousel from '../../../lib/components/Carousel';
import { PostCard } from '../../../lib/components/PostCard';
import { IRootState } from '../../../store/rootReducer';
import { loadImportant } from '../store/actions';

const selectImportant = (state: IRootState) => state.main.important;

const ImportantContainer: React.FC = () => {
  const posts = useSelector(selectImportant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadImportant());
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
